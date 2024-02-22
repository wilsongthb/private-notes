FROM python:3.8
COPY requirements.txt /var/requirements.txt
WORKDIR /var
RUN pip install -r requirements.txt
