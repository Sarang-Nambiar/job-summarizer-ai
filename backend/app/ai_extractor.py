import os 
from dotenv import load_dotenv
from schema import JobFields
from langchain_anthropic import ChatAnthropic
from langchain_core.prompts import ChatPromptTemplate
from langchain.text_splitter import CharacterTextSplitter
from transformers import GPT2TokenizerFast
import json

load_dotenv()

# Load the API key from the .env file
API_KEY = os.getenv("API_KEY")
MAX_TOKENS = 3900

def extract_with_ai(job_description: str, schema: JobFields):
    tokenizer = GPT2TokenizerFast.from_pretrained("gpt2") # hugging face tokenizer
    model = ChatAnthropic(model_name="claude-3-haiku-20240307", anthropic_api_key=API_KEY, temperature=0)

    system = f"""
    You are a helpful assistant that helps the user analyze the job description of the job provided below
    returns the summarised version of it with only the requested fields(Marked True in the schema). The fields are as follows:
    About the company: {schema.about_the_company}
    Job title: {schema.job_title}
    Job description: {schema.job_description}
    Location: {schema.location}
    Company Name: {schema.company_name}
    Job type: {schema.job_type}
    Qualifications: {schema.qualifications}
    Benefits: {schema.benefits}
    Salary: {schema.salary}

    If a field is marked as True and isn't present in the job description, please return an empty string.
    Make sure to send the output in stringified JSON format with the content beside the respective field names.
    Make sure to add emojis to the field name for better understanding.
    Give the output straight to the point without any introductions.
    Make sure the content is in bullet points using html tags.
    """
    human = "{job_description}"

    # Split the job description into chunks
    content = job_description["description"]
    text_splitter = CharacterTextSplitter.from_huggingface_tokenizer(tokenizer, chunk_size=MAX_TOKENS, chunk_overlap=0)

    chunks = text_splitter.split_text(content)

    prompt = ChatPromptTemplate.from_messages([("system", system), ("human", human)])

    chain = prompt | model

    # asynchronously invoke requests for claude to generate responses
    response = chain.batch([{ "job_description": chunk } for chunk in chunks])
    
    summary = {}
    for r in response:
        summary.update(json.loads(r.content.replace("\n", ""))) # update the summary with the latest response content
    
    return summary

