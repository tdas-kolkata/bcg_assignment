
# BCG Assignment

This is the BCG Assignment


## API Reference

#### Get all policies

```bash
  GET /api/policy/all
```

#### Get all clients

```bash
  GET /api/client/all
```



## Environment Variables

To run this project, you will need to add the following environment variables to your ./server/.env file

`SECRET_KEY`
  - here you should keep your secret key

`DATABASE_URL`
  - This should contain the database connection string

 `ENV`
  - This should be 'development' or 'production'

`DISABLE_COLLECTSTATIC`
  - This required to instruct heroku to skip the collectstatic method during deployment

## Deployment

To deploy  for testing

```bash
  python manage.py runserver
```
To deploy  for production

```bash
  gunicorn server.wsgi
```


## Authors

- [@tdas-kolkata](https://github.com/tdas-kolkata)


## Appendix

Any additional information goes here


## Demo

Insert gif or link to demo

