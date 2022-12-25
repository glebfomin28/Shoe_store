const http = require('http');
const fs = require('fs');
const Koa = require('koa');
const Router = require('koa-router');
const cors = require('koa2-cors');
const koaBody = require('koa-body');

const categories = JSON.parse(fs.readFileSync('./data/categories.json'));
const items = JSON.parse(fs.readFileSync('./data/products.json'));
const filters = JSON.parse(fs.readFileSync('./data/filters.json'));
const topSaleIds = [100, 41, 57, 31, 34, 101, 102, 73];
// const moreCount = 12;
const ordersList = []


const itemBasicMapper = item => ({
    id: item.id,
    category: item.category,
    title: item.title,
    price: item.price,
    images: item.images,
    oldPrice: item.oldPrice,

    manufacturer: item.manufacturer,
    heelSize: item.heelSize,
    color: item.color,
    division: item.division,
    reason: item.reason

});

const idGenerator = () => {
    const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G']
    const index = Math.floor(Math.random() * 7)
    const number = Math.floor(Math.random() * 10000)
    return letters[index] + `-${number}`
}
const randomNumber = (start, stop) => {
    return Math.floor(Math.random() * (stop - start + 1)) + start;
}

const containsItem = (arr1, arr2)  => {
    const test1 = arr2.every(arr2Item => arr1.includes(arr2Item))
    const test2 = arr1.every(arr1Item => arr2.includes(arr1Item))
    return test1 || test2
}


const fortune = (ctx, body = null, status = 200) => {
    // Uncomment for delay
    // const delay = randomNumber(1, 4) * 1000;
    const delay = 0;
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Uncomment for error generation
            // if (Math.random() > 0.85) {
            //     reject(new Error('Something bad happened'));
            //     return;
            // }
            ctx.set('Access-Control-Allow-Origin', '*');
            ctx.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
            ctx.set('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
            ctx.response.status = status;
            ctx.response.body = body;
            resolve();
        }, delay);
    })
}

const app = new Koa();
app.use(cors());
app.use(koaBody({
    json: true
}));

const router = new Router();

router.get('/api/top-sales', async (ctx, next) => {
    return fortune(ctx, items.filter(o => topSaleIds.includes(o.id)).map(itemBasicMapper));
});

router.get('/api/categories', async (ctx, next) => {
    return fortune(ctx, categories);
});

router.get('/api/items', async (ctx, next) => {
    const { query } = ctx.request;
    const categoryId = query.categoryId === undefined ? 0 : Number(query.categoryId);
    const q = query.q === undefined ? '' : query.q.trim().toLowerCase();

    const filtered = items
        .filter(o => categoryId === 0 || o.category === categoryId)
        .filter(o => o.title.toLowerCase().includes(q))
        .map(itemBasicMapper);

    return fortune(ctx, filtered);
});

router.get('/api/items/:id', async (ctx, next) => {
    const id = Number(ctx.params.id);
    const item = items.find(o => o.id === id);
    if (item === undefined) {
        return fortune(ctx, 'Not found', 404);
    }

    return fortune(ctx, item);
});

router.get('/api/itemsList/:coincidence', async (ctx, next) => {
    const coincidence = JSON.parse(ctx.params.coincidence);
    const ignoreId = coincidence.id === undefined ? 0 : Number(coincidence.id)
    const category = coincidence.category === undefined ? 0 : Number(coincidence.category)
    const division = coincidence.division.length === 0 ? 0 : coincidence.division

    if (!coincidence) {
        return fortune(ctx, 'Not found', 404);
    }
    const filtered = items
      .filter(o => ignoreId === 0 || o.id !== ignoreId)
      .filter(o => category === 0 || o.category === category)
      // .filter(o => containsItem(o.reason, reason))
      .filter(o => containsItem(o.division, division))
      .map(itemBasicMapper);


    return fortune(ctx, filtered);
});


router.post('/api/order', async (ctx, next) => {
    const { owner: { phone, address }, items, price, date } = ctx.request.body;
    if (typeof phone !== 'string') {
        return fortune(ctx, 'Bad Request: Phone', 400);
    }
    if (typeof address !== 'string') {
        return fortune(ctx, 'Bad Request: Address', 400);
    }
    if (!Array.isArray(items)) {
        return fortune(ctx, 'Bad Request: Items', 400);
    }
    if (price === '') {
        return fortune(ctx, 'Bad Request: Items', 400);
    }
    if (date === '' || typeof date !== 'string') {
        return fortune(ctx, 'Bad Request: Items', 400);
    }
    ordersList.unshift({...ctx.request.body, id: idGenerator()});

    return fortune(ctx, null, 204);
});

router.get('/api/orderList', async (ctx, next) => {
    return fortune(ctx, ordersList);
});

router.get('/api/filters', async (ctx, next) => {

    return fortune(ctx, filters);
});


router.delete('/api/deleteOrderList', async(ctx, next) => {
    ordersList.pop()
    ctx.response.status = 204;
    // return fortune(ctx, ordersList);
});

app.use(router.routes())
app.use(router.allowedMethods());

const port = process.env.PORT || 7070;
const server = http.createServer(app.callback());
server.listen(port);