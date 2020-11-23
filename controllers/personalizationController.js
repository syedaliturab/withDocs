const catchAsynsc = require('./../utils/catchAsync');
const {primarySpeciality,subSpeciality,clinicServices,clinicIssues} = require('./../models/specialitiesModel.js');


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




        
