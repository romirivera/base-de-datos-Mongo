//middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use('/'), router;
