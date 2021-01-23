const catchAsynsc = require('./../utils/catchAsync');
const docUser = require("../models/doctorModel");
const clinics = require("../models/clinicModel");


exports.getSearch = catchAsynsc(
    async (req, res, next) => {
    const regex = await {$regex: req.body.keyword, $options: 'i' };
    
    if(req.body.city != null && req.body.locality != null)
    {
        var doctorInfo = await docUser.find(
            {'name': regex,
            'city' : req.body.city,
            'locality' : req.body.locality}
        ).sort({visits: -1}).limit(5);
    }
    else if (req.body.city != null && req.body.locality == null)
    {
        var doctorInfo = await docUser.find(
            {
            'name': regex,
            'city' : req.body.city
        }
        ).sort({visits: -1}).limit(5);
    }
    else {
        var doctorInfo = await docUser.find(
            {
            'name': regex
        }
        ).sort({visits: -1}).limit(5);
    }

    if(req.body.keyword != null)
    {    

        var specialityInfo = await docUser.find(
        { 'primarySpeciality': regex }
        ).limit(5);
    }else{

        var specialityInfo = await docUser.find({}).limit(5);
    }


    if(req.body.city != null && req.body.locality != null)
    {
        var clinicName = await clinics.find({
            $or : [{
                'clinicOne.clinicName': regex,
                'clinicOne.city' : req.body.city,
                'clinicOne.locality' : req.body.locality
            },
            {
                'clinicTwo.clinicName': regex,
                'clinicTwo.city' : req.body.city,
                'clinicTwo.locality' : req.body.locality
            }
        ]
    }         
        ).sort({visits: -1})
    }
    else if (req.body.city != null && req.body.locality == null)
    {
        var clinicName = await clinics.find(
            {
                $or : [{
                    'clinicOne.clinicName': regex,
                    'clinicOne.city' : req.body.city
                },
                {
                    'clinicTwo.clinicName': regex,
                    'clinicTwo.city' : req.body.city
                }
            ]
        }           
            ).sort({visits: -1})
    }
    else {
        var clinicName = await clinics.find(
            {
                $or : [{
                    'clinicOne.clinicName': regex
                },
                {
                    'clinicTwo.clinicName': regex
                }
            ]
        }          
            ).sort({visits: -1})
    }

    if(req.body.keyword != null)
    {    

        var clinicIssue = await clinics.find(
            {
                $or : [
                    { 'clinicOne.clinicIssues': regex },
                    { 'clinicTwo.clinicIssues': regex }
                ]
            }
        ).sort({visits: -1}).limit(5);
    }else{

        var clinicIssue = await clinics.find({}).sort({visits: -1}).limit(5);
    }

    var result = [];
    var result1 = [];
    var result2 = [];
    var result3 = [];
    var result4 = []

    result.push(result1, result2, result3, result4);

    await doctorInfo.forEach(foundInfo=>{
        foundInfo.visits +=1;
        console.log(foundInfo.visits)
        foundInfo.save();
        result2.push(foundInfo.name);
    });

    await specialityInfo.forEach(foundInfo=>{
        result1.push(foundInfo.primarySpeciality);
    });

    await clinicName.forEach(foundInfo=>{
        let obj ={
            clinicOneName: foundInfo.clinicOne.clinicName,
            clinicTwoName: foundInfo.clinicTwo.clinicName
        };
        foundInfo.visits +=1;
        console.log(foundInfo.visits)
        foundInfo.save();
        result3.push(obj);
    });

    await clinicIssue.forEach(foundInfo=>{
        let obj ={
            clinicOne: foundInfo.clinicOne.clinicIssues,
            clinicTwo: foundInfo.clinicTwo.clinicIssues
        };
        result4.push(obj);
    });

    res.status(200).jsonp({
        status : 'success',
        data : result
    });
});



exports.getDoctorSearch = catchAsynsc(
    async(req, res, next) =>{
        const regexDoctor = await {$regex: req.body.keyword, $options: 'i' };
        
        var resultDoctor = [];

    if(req.body.city != null && req.body.locality != null)
    {
        var doctorResult = await docUser.find(
            {'name': regexDoctor,
            'city' : req.body.city,
            'locality' : req.body.locality}
        ).sort({visits: -1}).limit(5);
    }
    else if (req.body.city != null && req.body.locality == null)
    {
        var doctorResult = await docUser.find(
            {
            'name': regexDoctor,
            'city' : req.body.city
        }
        ).sort({visits: -1}).limit(5);
    }
    else {
        var doctorResult = await docUser.find(
            {
            'name': regexDoctor
        }
        ).sort({visits: -1}).limit(5);
    }

        await doctorResult.forEach(foundInfo=>{
            let obj = {
                id : foundInfo._id,
                label : foundInfo.name
            }
                resultDoctor.push(foundInfo.name)
            })
        res.status(200).jsonp({
            status : 'success',
            data : resultDoctor
        });
});

exports.getClinicSearch = catchAsynsc(
    async(req, res, next) =>{
        const regexClinic = await {$regex: req.body.keyword, $options: 'i' };
        
        var resultClinic = [];

        if(req.body.city != null && req.body.locality != null)
        {
            var clinicName = await clinics.find(
                {
                    $or : [{
                        'clinicOne.clinicName': regexClinic,
                        'clinicOne.city' : req.body.city,
                        'clinicOne.locality' : req.body.locality
                    },
                    {
                        'clinicTwo.clinicName': regexClinic,
                        'clinicTwo.city' : req.body.city,
                        'clinicTwo.locality' : req.body.locality
                    }
                ]
            }         
            ).sort({visits: -1})
        }
        else if (req.body.city != null && req.body.locality == null)
        {
            var clinicName = await clinics.find(
                {
                    $or : [{
                        'clinicOne.clinicName': regexClinic,
                        'clinicOne.city' : req.body.city
                    },
                    {
                        'clinicTwo.clinicName': regexClinic,
                        'clinicTwo.city' : req.body.city
                    }
                ]
            }           
                ).sort({visits: -1})
        }
        else {
            var clinicName = await clinics.find({
                $or : [
                    {
                        'clinicOne.clinicName': regexClinic
                    },
                    {
                        'clinicTwo.clinicName': regexClinic
                    }      
                ]
            }         
                ).sort({visits: -1})
        }

        await clinicName.forEach(foundInfo=>{
            let obj ={
                clinicOneName: foundInfo.clinicOne.clinicName,
                clinicTwoName: foundInfo.clinicTwo.clinicName
            };
            resultClinic.push(obj);
        });
        res.status(200).jsonp({
            status : 'success',
            data : resultClinic
        });
});
       
        
