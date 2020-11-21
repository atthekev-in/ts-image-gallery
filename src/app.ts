import server from './server';

const port = parseInt(process.env.PORT || '8888');

const starter = new server().start(port)
    .then(port => console.log(`running on port ${port}`))
    .catch(error => {
        console.log(error);
    });

export default starter;