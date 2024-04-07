import os 
from dotenv import load_dotenv
from langchain_anthropic import ChatAnthropic
from langchain_core.prompts import ChatPromptTemplate

load_dotenv()

# Load the API key from the .env file
API_KEY = os.getenv("ANTHROPIC_KEY")

def extract_with_ai(job_description: str, schema: dict):
    model = ChatAnthropic(model_name="claude-3-sonnet-20240229", anthropic_api_key=API_KEY, temperature=0)

    system = """
    You are a helpful assistant that helps the user analyze the job description of the job provided below
    returns the summarised version of it with only the requested fields(Marked True in the schema):
    About the company: {about_the_company}
    Job title: {job_title}
    Job description: {job_description}
    Company Name: {company_name}
    Job type: {job_type}
    Qualifications: {qualifications}
    Benefits: {benefits}
    Salary: {salary}

    The order given above needn't be followed strictly, but the fields should be included in the summary.
    """

    prompt = ChatPromptTemplate.from_messages([("system", system), (job_description)])

    chain = prompt | model

    response = chain.invoke(schema)

    return response