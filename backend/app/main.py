from fastapi import FastAPI
from pydantic import BaseModel
from scraper import extract_data
from fastapi.middleware.cors import CORSMiddleware
from ai_extractor import extract_with_ai
from schema import extract_schema
import uvicorn

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Item(BaseModel):
    url: str
    fields: list

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.post("/extract/")
def extract(item: Item):
    print(item.fields)
    job_description = extract_data(item.url)
    schema = extract_schema(item.fields)
    print(schema)
    if "error" in job_description:
        return {"error": job_description["error"]}

    data = extract_with_ai(job_description, schema)
    return {"summary": data}

# For running the uvicorn server
if __name__ == "__main__":  
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)