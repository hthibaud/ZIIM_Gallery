from fastapi import FastAPI

def Init(app: FastAPI):
    @app.get("/status")
    async def status():
        return {"status": "Ok"}