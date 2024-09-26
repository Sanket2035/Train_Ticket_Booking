app.get('/', (req, res) => {
    res.sendFile('signup.html', { root: 'views' })
});
app.get('/login', (req, res) => {
    res.sendFile('login.html', { root: 'views' })
})

app.get('/booking', (req, res) => {
    res.sendFile('booking.html', { root: 'views' })
})
app.get('/bus', (req, res) => {
    res.sendFile('bus.html', { root: 'views' })
})
app.get('/taxi', (req, res) => {
    res.sendFile('taxi.html', { root: 'views' })
})


app.get('/railway', (req, res) => {
    res.sendFile('railway.html', { root: 'views' })
})