import json
from pathlib import Path
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
filepath = Path("/counter.json")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://mars86.dev"],
    allow_methods=["GET", "POST"],
)

def load_count() -> int:
    if filepath.is_file():
        with open(filepath, "r") as f:
            data = json.load(f)
            return data["count"]
    else:
        return 0

def save_count(value: int) -> None:
    tmp_path = filepath.with_suffix(".tmp")
    with open(tmp_path, "w") as f:
        json.dump({"count": value}, f)
    tmp_path.replace(filepath)

count = load_count()

@app.get("/count")
def get_count():
    return {"count": count}

@app.post("/count")
def increment_count():
    global count
    count += 1
    save_count(count)
    return {"count": count}

# run with: uvicorn main:app --reload --port 5757
# this is a backend!! im just putting it here so i dont need another git pull webhook for backends!!