const catchAsynsc = require('./../utils/catchAsync');
const {primarySpeciality,subSpeciality,clinicServices,clinicIssues} = require('./../models/specialitiesModel.js');
const {topCities,otherCities, toplocalities, otherlocalities} = require('./../models/citiesModel.js');

exports.citiesSearch = catchAsynsc(
    async (req, res, next) => {
    
        const topcities = await topCities.find({ topCity: { $regex: req.body.keyword, $options: 'i' }},{ topCity: 1, _id: 0 });
        const othercities = await otherCities.find({ otherCity: { $regex: req.body.keyword, $options: 'i' }},{ otherCity: 1, _id: 0 });

        res.status(200).json({
            status: 'success',
            data: {
                topcities,
                othercities
            }
        });
        
});

exports.createTopCities = catchAsynsc(
    async (req, res, next) => {
        
        for(var element of req.body.data){
            const member = await topCities.create(element);
            console.log(member);
        }
        //const speciality = await primarySpeciality.create(req.body);
        res.status(200).json({
            status: 'success',
            data: req.body
        });
    }
);

exports.createOtherCities = catchAsynsc(
    async (req, res, next) => {
        console.log(req.body.data)
        for(var element of req.body.data){
            console.log(element)
            const member = await otherCities.create(element);
            console.log(member);
        }
        //const speciality = await primarySpeciality.create(req.body);
        res.status(200).json({
            status: 'success',
            data: req.body
        });
    }
);

exports.localitySearch = catchAsynsc(
    async (req, res, next) => {
    
        const topLocalities = await toplocalities.find({ topLocality: { $regex: req.body.keyword, $options: 'i' }},{ topLocality: 1, _id: 0 });
        const otherLocalities = await otherlocalities.find({ otherLocality: { $regex: req.body.keyword, $options: 'i' }},{ otherLocality: 1, _id: 0 });

        res.status(200).json({
            status: 'success',
            data: {
                topLocalities,
                otherLocalities
            }
        });
        
});

exports.createTopLocalities = catchAsynsc(
    async (req, res, next) => {
        
        for(var element of req.body.data){
            const member = await toplocalities.create(element);
            console.log(member);
        }
        res.status(200).json({
            status: 'success',
            data: req.body
        });
    }
);

exports.createOtherLocalities = catchAsynsc(
    async (req, res, next) => {
        for(var element of req.body.data){
            const member = await otherlocalities.create(element);
            console.log(member);
        }
        res.status(200).json({
            status: 'success',
            data: req.body
        });
    }
);

exports.personalSearch = catchAsynsc(
    async (req, res, next) => {
    
        const  trendingSpecialities = await primarySpeciality.find({},{ primarySpeciality: 1, _id: 0 }).sort({trend: -1}).limit(6);
        
        const trendingIssues = await clinicIssues.find({},{ clinicIssues: 1, _id: 0 }).sort({trend: -1}).limit(8);
        res.status(200).json({
            status: 'success',
            data: {
                trendingSpecialities,
                trendingIssues
            }
        });
        
});

exports.trendingIssues = catchAsynsc(
    async (req, res, next) => {
    
        const trendingIssues = await clinicIssues.find({},{ clinicIssues: 1, _id: 0 }).sort({trend: -1});
        res.status(200).json({
            status: 'success',
            data: trendingIssues
        });
        
});

exports.trendingSpecialities = catchAsynsc(
    async (req, res, next) => {
    
        const  trendingSpecialities = await primarySpeciality.find({},{ primarySpeciality: 1, _id: 0 }).sort({trend: -1});
        res.status(200).json({
            status: 'success',
            data: trendingSpecialities
        });
        
});



        
