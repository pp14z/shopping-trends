FROM python:3.11-slim

# set environment variables
ENV PIP_DISABLE_VERSION_CHECK 1
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# set work directory
WORKDIR /usr/src/app

# install dependencies
COPY requirements.txt /usr/src/app/
RUN pip install --no-cache-dir -r requirements.txt

# copy project
COPY . /usr/src/app/

# expose port
EXPOSE 8000

# run entrypoint script
CMD ./entrypoint.sh
