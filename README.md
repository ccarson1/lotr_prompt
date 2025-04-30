### Running the Django Application with Docker

To build and run the Django application using Docker, follow these steps:

1. **Build the Docker image** (without using cached layers):

   ```bash
   docker build --no-cache -t lotr_prompt_1.0.0 .

2. **Run the Docker image**:

   ```bash
   docker run -p 8000:8000 lotr_prompt_1.0.0

  
