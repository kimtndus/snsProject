const express = require('express');
const app = express();
app.set('port', process.env.PORT || 3000);
const path = require('path');

app.use((req, res, next) => {
    console.log(`모든 요청에 대해 다 실행`);
    next();
});

app.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, "index.html"));
    console.log(`GET / 요청시에만 실행`);
    // next();
}, (req, res) => {
    throw new Error(`요청 파일이 없음`);
});

app.use((err, req, res, next) => {
    console.error(`에러 : ${err}`);
    res.status(500).send(err.message);
    // next();
});


app.use((err, req, res, next) => {
    console.log(`에러 : ${err}`);
    res.status(404).send(err.message)
});




app.listen(app.get('port'), () => {
    console.log(app.get('port'), `번 포트에서 대기중`);
});
