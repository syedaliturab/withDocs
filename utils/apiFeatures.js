class APIFeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }
    filter() {
        //Filtering
        const queryObject = {
            ...this.queryString
        }
        const excludeFields = ['page', 'sort', 'limits', 'fields']
        excludeFields.forEach(el => {
            delete queryObject[el]
        });

        let queryStr = JSON.stringify(queryObject);

        queryStr = queryStr.replace(/\b(gte|,gt|lte|lt)\b/g, match =>
            `$${match}`);
        //this.query = this.query.find(JSON.parse(queryStr));
        this.query.find(JSON.parse(queryStr));

        return this;
    }
    sort() {

        // Sorting
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(',').join(' ');

            this.query.sort(sortBy);

        } else {
            this.query.sort('experience');

        }
        return this;
    }
    limitField() {
        //Fields limiting
        if (this.queryString.fields) {
            const fields = this.queryString.fields.split(',').join(' ');
            this.query.select(fields);
        } else {
            this.query.select('-__v');
        }

        return this;
    }

    //Pagination
    paginate() {

        const page = this.queryString.page * 1 || 1;
        const limit = this.queryString.limits * 1 || 100;
        const skip = (page - 1) * limit;
        this.query.skip(skip).limit(limit);
        return this;
    }
}
module.exports = APIFeatures;