from pydantic import BaseModel

class JobFields(BaseModel):
    about_the_company: bool = True
    job_title: bool = True
    job_description: bool = True
    company_name: bool = True
    job_type: bool = True
    location: bool = True
    qualifications: bool = True
    benefits: bool = True
    salary: bool = True

    def __init__(self, **data):
        super().__init__(**data)
        self.about_the_company = data.get("about_the_company", True)
        self.job_title = data.get("job_title", True)
        self.job_description = data.get("job_description", True)
        self.company_name = data.get("company_name", True)
        self.job_type = data.get("job_type", True)
        self.location = data.get("location", True)
        self.qualifications = data.get("qualifications", False)
        self.benefits = data.get("benefits", True)
        self.salary = data.get("salary", True)

# Extract the schema from the fields
def extract_schema(schema):
    fields = {}
    for field in schema:
        fields[name_to_key(field["name"])] = field["value"]
    return JobFields(**fields)

# Convert the name to a key
def name_to_key(name):
    return name.lower().replace(" ", "_")