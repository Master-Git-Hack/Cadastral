# Flask Template for projects

## Previous requirements

1. [Python 3.6+](https://www.python.org/downloads/)

2. [PIP](https://pip.pypa.io/en/stable/installation/)

3. [VirtualEnv](https://virtualenv.pypa.io/en/latest/installation.html)

## Install dependencies

```bash
pip install -r requirements.txt
pip install -r requirements.txt --upgrade

```

## The tree structure should now look as follows

```bash
.
├── _build
├── docs
├── src
│   ├── __init__.py
│   ├── config.py
│   │
│   ├── apps
│   │   ├── Auth
│   │   │  ├── __init__.py
│   │   │  │
│   │   │  ├── api
│   │   │  │   ├── models
│   │   │  │   │   ├── __init__.py 
│   │   │  │   │   ├── auth.py
│   │   │  │   │   └── user.py  
│   │   │  │   │
│   │   │  │   └── routes
│   │   │  │       ├── __init__.py 
│   │   │  │       ├── auth.py 
│   │   │  │       └── user.py 
│   │   │  │
│   │   │  ├── controllers
│   │   │  │   └── __init__.py
│   │   │  │
│   │   │  ├── helpers
│   │   │  │   └── __init__.py 
│   │   │  │
│   │   │  ├── models
│   │   │  │   ├── __init__.py
│   │   │  │   └── blacklist.py
│   │   │  │
│   │   │  ├── services
│   │   │  │   ├── __init__.py
│   │   │  │   └── blacklist.py
│   │   │  │
│   │   │  ├── test
│   │   │  │   ├── __test__auth.py
│   │   │  │   └── __test__userModel.py
│   │   │  │
│   │   │  └── __init__.py
│   │   │
│   │   ├── __init__.py
│   │   │
│   │   ├── [App Name]
│   │   │  ├── __init__.py
│   │   │  │
│   │   │  ├── api
│   │   │  │   ├── models
│   │   │  │   │   └── __init__.py 
│   │   │  │   │
│   │   │  │   └── routes
│   │   │  │       └── __init__.py 
│   │   │  │
│   │   │  ├── controllers
│   │   │  │   └── __init__.py
│   │   │  │
│   │   │  ├── helpers
│   │   │  │   └── __init__.py 
│   │   │  │
│   │   │  ├── models
│   │   │  │   └── __init__.py
│   │   │  │
│   │   │  ├── services
│   │   │  │   └── __init__.py
│   │   │  │
│   │   │  ├── test
│   │   │  │   └── __test__[test name].py
│   │   │  │
│   │   │  └── __init__.py
│   │   │
│   │   └── __init__.py
│   │
│   ├── routes
│   │   └── __init__.py
│   ├── test
│   │   ├── __init__.py
│   │   ├── __test__config.py 
│   │   └── base.py
│   │
│   ├── tmp
│   │
│   └── utils
│       ├── __init__.py
│       ├── local.py
│       ├── pdf.py
│       └── tmp.py
│
├── .flaskenv
├── .gitignore
├── .venv
├── conf.py
├── Dockerfile
├── index.rst
├── make.bat
├── Makefile
├── README.md
├── requirements.txt
├── start.sh
└── wsgi.py
```

## Execute the application

Run application

```bash
flask run
```

Create Documentation from docstrings
The docstrings format used ath the project is [Google](https://google.github.io/styleguide/pyguide.html) knwon as `napoleon` style at sphinx extensions

1. Create a dir called `docs`.

2. run `sphinx-apidoc -o docs src` that will create the files in `docs` directory from the docstrings used in the `src` directory.

3. run `make html` to generate the html documentation.

[reference](https://www.freecodecamp.org/news/structuring-a-flask-restplus-web-service-for-production-builds-c2ec676de563)
