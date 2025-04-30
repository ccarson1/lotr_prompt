docker build --no-cache -t lotr_prompt_1.0.0 .
docker run -p 8000:8000 lotr_prompt_1.0.0   
