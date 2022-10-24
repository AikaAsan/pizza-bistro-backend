import Pizza from '../models/Pizza.js';

export const getPizzas = async (req, res) => {
    try {
        const { sortBy, category, page, search } = req.query;
        const dbSortBy = { [sortBy]: 'asc' } || { title: 'asc' };
        const dbCategory = category ? { category: category } : {};
        const dbSearch = search
            ? {
                  title: { $regex: new RegExp(search), $options: 'i' },
              }
            : {};
        const dbPage = page === 1 ? 0 : page - 1;
        const itemsPerPage = 4;
        const skipPage = dbPage * itemsPerPage;

        // const totalPages = Math.ceil((await Pizza.count()) / 4);
        // const totalItems = await Pizza.count();

        const pizzas = await Pizza.find({ ...dbCategory, ...dbSearch })
            .sort(dbSortBy)
            .skip(skipPage)
            .limit(itemsPerPage);

        res.status(200).json(pizzas);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Failed to fetch data',
        });
    }
};

export const getOnePizza = async (req, res) => {
    try {
        const pizzaId = req.params.id;
        console.log('pizzaId:', pizzaId);
        const pizza = await Pizza.findOne({ id: pizzaId }).exec();
        res.json(pizza);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Failed to fetch pizza',
        });
    }
};
