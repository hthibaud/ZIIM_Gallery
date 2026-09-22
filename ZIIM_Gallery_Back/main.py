from fastapi import FastAPI
from route import Init as InitRoute
from database import Base, Database
from fastapi.middleware.cors import CORSMiddleware
import boto3
from botocore.exceptions import ClientError
from contextlib import asynccontextmanager
import json
import os
from dotenv import load_dotenv

load_dotenv()

s3_client = boto3.client(
    's3',
    endpoint_url=f'http://{os.getenv("MINIO_URL")}', 
    aws_access_key_id= os.getenv("MINIO_ACCESS_KEY"),
    aws_secret_access_key= os.getenv("MINIO_SECRET_KEY")
)

def init_minio_bucket(bucket_name: str):
    try:
        s3_client.head_bucket(Bucket=bucket_name)
    except ClientError as e:
        error_code = e.response['Error']['Code']
        if error_code == '404':
            # Création du bucket s'il est introuvable
            s3_client.create_bucket(Bucket=bucket_name)
            
            # Définition de la policy JSON pour l'accès public en lecture
            policy = {
                "Version": "2012-10-17",
                "Statement": [
                    {
                        "Effect": "Allow",
                        "Principal": "*",
                        "Action": ["s3:GetObject"],
                        "Resource": [f"arn:aws:s3:::{bucket_name}/*"]
                    }
                ]
            }
            s3_client.put_bucket_policy(
                Bucket=bucket_name, 
                Policy=json.dumps(policy)
            )
        else:
            raise

@asynccontextmanager
async def lifespan(app: FastAPI):
    init_minio_bucket("avatars")
    yield
    # (Logique de nettoyage à l'arrêt du serveur ici si besoin)

app = FastAPI(lifespan=lifespan)
db = Database()
Base.metadata.create_all(bind=db.engine)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

InitRoute(app, db)