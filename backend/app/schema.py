from pydantic import BaseModel

class JobFields(BaseModel):
    about_the_company: bool = True
    job_title: bool = True
    job_description: bool = True
    company_name: bool = True
    job_type: bool = True
    qualifications: bool = False
    benefits: bool = True
    salary: bool = True