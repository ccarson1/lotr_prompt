
FROM ubuntu:22.04

# Set environment variables to prevent prompts during install
ENV DEBIAN_FRONTEND=noninteractive

# Install system dependencies
RUN apt update && apt install -y \
    python3 \
    python3-venv \
    python3-pip \
    git \
    curl \
    netcat \
    && apt clean

# Set working directory
WORKDIR /lotr_prompt

# Clone the repository
RUN git clone https://github.com/ccarson1/lotr_prompt.git /lotr_prompt

# Create virtual environment and activate it
RUN python3 -m venv venv

# Install dependencies from requirements.txt
RUN /lotr_prompt/venv/bin/pip install --upgrade pip && \
    /lotr_prompt/venv/bin/pip install -r requirements.txt

# Expose Django's default port
EXPOSE 8000

# Set environment path to use virtualenv Python
ENV PATH="/lotr_prompt/venv/bin:$PATH"

# Run the Django server
CMD ["sh", "-c", "python3 manage.py migrate && python3 manage.py runserver 0.0.0.0:8000"]
