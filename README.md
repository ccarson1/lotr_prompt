### Running the Lord of the Rings Prompt with Docker

To build and run the Django application using Docker, follow these steps:

1. **Download the lotr_promt repository**

2. **Build the Docker image** (without using cached layers):

   ```bash
   docker build --no-cache -t lotr_prompt_1.0.0 .

3. **Run the Docker image**:

   ```bash
   docker run -p 8000:8000 lotr_prompt_1.0.0

4. **Open the application in the web browser**
   http://localhost:8000/

  
