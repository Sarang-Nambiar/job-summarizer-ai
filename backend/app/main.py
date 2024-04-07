from fastapi import FastAPI
from scraper import extract_data
from ai_extractor import extract_with_ai
from schema import JobFields
import uvicorn

app = FastAPI()

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/extract/")
def extract(url: str):
    MAX_TOKENS = 4000
    job_description = extract_data(url)

    if "error" in job_description:
        return {"error": job_description["error"]}

    schema = JobFields()
    data = extract_with_ai(job_description["description"][:MAX_TOKENS], schema.model_dump())

    return {"data": data}

# For running the uvicorn server
if __name__ == "__main__":  
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)