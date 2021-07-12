# thisIsBook API
- A RESTful web API that you can play with JSON CRUD operations.
- Each book document consists of ID, title, author, and price
- Deployed at https://nameless-sands-83628.herokuapp.com/ 


## DEV STACK
- backend - nodeJS

- frontend - AJAX, HTML/CSS/JS

- DB - mongoose, mongoDB Atlas

## Test
- postman

## Deployment
- heroku

<br/>

## ENDPOINT
root == https://nameless-sands-83628.herokuapp.com

<br/>

### GET a doc
<b>root/books/:id</b>

<br/>

example in Postman

![image](https://user-images.githubusercontent.com/82918661/125215074-294e8580-e2b2-11eb-9617-37e61eb88343.png)


```
/books/6090840cfd4e6500159a0d89

{
  "_id": "6090840cfd4e6500159a0d89",
  "name": "FICTION",
  "title": "Goodfellas Salute",
  "author": "Tzvetan Zielinski",
  "price": 56.39,
  "__v": 0,
  "createdAt": "2021-05-03T23:15:24.027Z",
  "updatedAt": "2021-05-03T23:15:24.027Z"
}
```

<br/>

### PUT(UPDATE) a doc
<b>root/books/:id</b>

<br/>

example in Postman

![image](https://user-images.githubusercontent.com/82918661/125215232-b42f8000-e2b2-11eb-82bc-ba9271f3a583.png)


![image](https://user-images.githubusercontent.com/82918661/125215299-01135680-e2b3-11eb-9e76-729fce064b97.png)
```
{
    "_id": "6090840cfd4e6500159a0d8f",
    "name": "SF",
    "title": "testig update",
    "author": "testig update",
    "price": 1.1,
    "__v": 0,
    "createdAt": "2021-05-03T23:15:24.029Z",
    "updatedAt": "2021-07-12T00:45:36.168Z"
}
```

<br/>

### DELETE a doc
<b>root/books/:id</b>

<br/>

example in Postman

![image](https://user-images.githubusercontent.com/82918661/125215602-db3a8180-e2b3-11eb-98b0-8f07f58054f3.png)


![image](https://user-images.githubusercontent.com/82918661/125215731-218fe080-e2b4-11eb-980b-37758be09d96.png)

```null```


<br/>


#### All HTTP method interaction (req & res) above is what you see at the web https://nameless-sands-83628.herokuapp.com as a client level playground.





