const catchAsynsc = require('./../utils/catchAsync');
const {regularAndIrregular, flow, discharge, intimacyAndPhases, pregnancyTest, ovulationTest, notes, pills} = require('../models/patientReportModel');
const { patient } = require('../models/patientModel');
const e = require('express');

// -----------------------------REGULAR AND IRREGULAR -----------------------------------

exports.createRegularAndIrregular = catchAsynsc(
    async(req, res, next) => {
        req.body.predictedStartDate = new Date(req.body.predictedStartDate);
        req.body.predictedEndDate = new Date(req.body.predictedEndDate);
        req.body.actualStartDate = new Date(req.body.actualStartDate);
        req.body.actualEndDate = new Date(req.body.actualEndDate);
        console.log(req.body.predictedStartDate + " ");
        console.log(req.body.predictedEndDate + " ");
        console.log(req.body.actualStartDate + " ");
        console.log(req.body.actualEndDate + " ");
        const diffTime = Math.abs(req.body.predictedStartDate.getTime() - req.body.actualStartDate.getTime());
        req.body.diffInDate = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
        console.log(diffTime)

        const createInfo = await regularAndIrregular.create(req.body);
        const getPatientInfo = await patient.findById(req.body.patientId);
        const fetchExistingInfo = await regularAndIrregular.findById(getPatientInfo.regularAndIrregular);

        if(fetchExistingInfo == null)
        {
            if(Math.abs(createInfo.diffInDate) > 4){
                createInfo.irregularCount = 1;
                createInfo.regularCount = 0;
            }else{
                createInfo.regularCount = 1;
                createInfo.irregularCount = 0;
            }
        }else{
            if(Math.abs(createInfo.diffInDate) > 4){
                createInfo.irregularCount = fetchExistingInfo.irregularCount + 1;
                createInfo.regularCount = fetchExistingInfo.regularCount;
            }else{
                createInfo.regularCount = fetchExistingInfo.regularCount + 1;
                createInfo.irregularCount = fetchExistingInfo.irregularCount;
            }
        }

        await createInfo.save();
        getPatientInfo.regularAndIrregular = createInfo;
        await getPatientInfo.save();
        res.status(200).json({
            status : 'success',
            data : createInfo
        });
    }
);

exports.getRegularAndIrregular = catchAsynsc(
    async(req, res, next) => {
        const getInfo = await regularAndIrregular.findById(req.params.id);
        
        res.status(200).json({
            status : 'success',
            data: getInfo
        })
    }
);

exports.updateRegularAndIrregular = catchAsynsc(
    async(req, res, next) => {
        const diffTime = Math.abs(req.body.predictedStartDate - req.body.actualStartDate);
        req.body.diffInDate = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

        const updateData = await regularAndIrregular.findByIdAndUpdate(
            req.body.id,req.body,{
                new: true,
                runValidators: true
            }
        );
        const getPatientInfo = await patient.findById(req.body.patientId);
        const fetchExistingInfo = await regularAndIrregular.findById(getPatientInfo.regularAndIrregular);


        if(abs(updateData.diffInDate) > 4){
            updateData.irregularCount = fetchExistingInfo.irregularCount + 1;
        }else{
            updateData.regularCount =fetchExistingInfo.regularCount + 1;
        }

        await updateData.save();
        getPatientInfo.regularAndIrregular = updateData;
        await getPatientInfo.save();

        res.status(200).json({
            status : 'success',
            data : updateData
        });
    }
);

exports.deleteRegularAndIrregular = catchAsynsc(
    async(req, res, next) => {
        const deleteInfo = await regularAndIrregular.findByIdAndRemove(req.body.id);
        
        res.status(200).json({
            status : 'success',
            data: deleteInfo
        })
    }
);

exports.getAllRegularAndIrregular = catchAsynsc(
    async(req, res, next) => {
        const getInfo = await regularAndIrregular.find({patientId: req.params.id});
        
        res.status(200).json({
            status : 'success',
            data: getInfo
        })
    }
);

// -------------------------FLOW--------------------------------------------

exports.createFlow = catchAsynsc(
    async(req, res, next) => {
        const createInfo = await flow.create(req.body);
        const getPatientInfo = await patient.findById(req.body.patientId);
        const fetchExistingInfo = await flow.findById(getPatientInfo.flow);

        if(fetchExistingInfo == null)
        {
            if(createInfo.light == true)
            {
                createInfo.lightCount = 1;
            }
            if(createInfo.medium == true)
            {
                createInfo.mediumCount = 1;
            }
            if(createInfo.heavy == true)
            {
                createInfo.heavyCount = 1;
            } 
            if(createInfo.spotting == true)
            {
                createInfo.spottingCount = 1;
            }
        }else{
            if(createInfo.light == true)
            {
                createInfo.lightCount = fetchExistingInfo.lightCount + 1;
            } else  createInfo.lightCount = fetchExistingInfo.lightCount;
            if(createInfo.medium == true)
            {
                createInfo.mediumCount = fetchExistingInfo.mediumCount + 1;
            } else createInfo.mediumCount = fetchExistingInfo.mediumCount;
            if(createInfo.heavy == true)
            {
                createInfo.heavyCount = fetchExistingInfo.heavyCount + 1;
            } else createInfo.heavyCount = fetchExistingInfo.heavyCount;
            if(createInfo.spotting == true)
            {
                createInfo.spottingCount = fetchExistingInfo.spottingCount + 1;
            } else createInfo.spottingCount = fetchExistingInfo.spottingCount;
        }

        await createInfo.save();
        getPatientInfo.flow = createInfo;
        await getPatientInfo.save();
        res.status(200).json({
            status : 'success',
            data : createInfo
        });
    }
);



exports.getFlow = catchAsynsc(
    async(req, res, next) => {
        const getInfo = await flow.findById(req.params.id);
        
        res.status(200).json({
            status : 'success',
            data: getInfo
        })
    }
);

exports.updateFlow = catchAsynsc(
    async(req, res, next) => {
        

        const updateData = await flow.findByIdAndUpdate(
            req.body.id,req.body,{
                new: true,
                runValidators: true
            }
        );

        const getPatientInfo = await patient.findById(req.body.patientId);
        const fetchExistingInfo = await flow.findById(getPatientInfo.flow);
        if(updateData.light == true)
        {
            updateData.lightCount = fetchExistingInfo.lightCount + 1;
        } else  updateData.lightCount = fetchExistingInfo.lightCount;
        if(updateData.medium == true)
        {
            updateData.mediumCount = fetchExistingInfo.mediumCount + 1;
        } else updateData.mediumCount = fetchExistingInfo.mediumCount;
        if(updateData.heavy == true)
        {
            updateData.heavyCount = fetchExistingInfo.heavyCount + 1;
        } else updateData.heavyCount = fetchExistingInfo.heavyCount;
        if(updateData.spotting == true)
        {
            updateData.spottingCount = fetchExistingInfo.spottingCount + 1;
        } else updateData.spottingCount = fetchExistingInfo.spottingCount;

        await updateData.save();
        getPatientInfo.flow = updateData;
        await getPatientInfo.save();

        res.status(200).json({
            status : 'success',
            data : updateData
        });
    }
);

exports.deleteFlow = catchAsynsc(
    async(req, res, next) => {
        const deleteInfo = await flow.findByIdAndRemove(req.body.id);
        
        res.status(200).json({
            status : 'success',
            data: deleteInfo
        })
    }
);

exports.getAllFlow = catchAsynsc(
    async(req, res, next) => {
        const getInfo = await flow.find({patientId: req.params.id});
        
        res.status(200).json({
            status : 'success',
            data: getInfo
        })
    }
);


// ---------------------------------------------Discharge----------------------------------------------------------


exports.createDischarge = catchAsynsc(
    async(req, res, next) => {
        const createInfo = await discharge.create(req.body);
        const getPatientInfo = await patient.findById(req.body.patientId);
        const fetchExistingInfo = await discharge.findById(getPatientInfo.discharge);
        if(fetchExistingInfo == null)
        {
            if(createInfo.sticky == true)
            {
                createInfo.stickyCount = 1;
            }
            if(createInfo.creamy == true)
            {
                createInfo.creamyCount = 1;
            }
            if(createInfo.watery == true)
            {
                createInfo.wateryCount = 1;
            } 
            if(createInfo.eggWhite == true)
            {
                createInfo.eggWhiteCount = 1;
            }
            if(createInfo.dry == true)
            {
                createInfo.dryCount = 1;
            }
        }else{
        if(createInfo.dry == true)
        {
            createInfo.dryCount = fetchExistingInfo.dryCount + 1;
        } else  createInfo.dryCount = fetchExistingInfo.dryCount;
        if(createInfo.sticky == true)
        {
            createInfo.stickyCount = fetchExistingInfo.stickyCount + 1;
        } else createInfo.stickyCount = fetchExistingInfo.stickyCount;
        if(createInfo.creamy == true)
        {
            createInfo.creamyCount = fetchExistingInfo.creamyCount + 1;
        } else createInfo.creamyCount = fetchExistingInfo.creamyCount;
        if(createInfo.watery == true)
        {
            createInfo.wateryCount = fetchExistingInfo.wateryCount + 1;
        } else createInfo.wateryCount = fetchExistingInfo.wateryCount;
        if(createInfo.eggWhite == true)
        {
            createInfo.eggWhiteCount = fetchExistingInfo.eggWhiteCount + 1;
        } else createInfo.eggWhiteCount = fetchExistingInfo.eggWhiteCount;
    }
        await createInfo.save();
        getPatientInfo.discharge = createInfo;
        await getPatientInfo.save();

        res.status(200).json({
            status : 'success',
            data : createInfo
        });
    }
);

exports.getDischarge = catchAsynsc(
    async(req, res, next) => {
        const getInfo = await discharge.findById(req.params.id);
        
        res.status(200).json({
            status : 'success',
            data: getInfo
        })
    }
);

exports.updateDischarge = catchAsynsc(
    async(req, res, next) => {
        

        const updateData = await discharge.findByIdAndUpdate(
            req.body.id,req.body,{
                new: true,
                runValidators: true
            }
        );

        const getPatientInfo = await patient.findById(req.body.patientId);
        const fetchExistingInfo = await discharge.findById(getPatientInfo.discharge);

        if(createInfo.dry == true)
        {
            createInfo.dryCount = fetchExistingInfo.dryCount + 1;
        } else  createInfo.dryCount = fetchExistingInfo.dryCount;
        if(createInfo.sticky == true)
        {
            createInfo.stickyCount = fetchExistingInfo.stickyCount + 1;
        } else createInfo.stickyCount = fetchExistingInfo.stickyCount;
        if(createInfo.creamy == true)
        {
            createInfo.creamyCount = fetchExistingInfo.creamyCount + 1;
        } else createInfo.creamyCount = fetchExistingInfo.creamyCount;
        if(createInfo.watery == true)
        {
            createInfo.wateryCount = fetchExistingInfo.wateryCount + 1;
        } else createInfo.wateryCount = fetchExistingInfo.wateryCount;
        if(createInfo.eggWhite == true)
        {
            createInfo.eggWhiteCount = fetchExistingInfo.eggWhiteCount + 1;
        } else createInfo.eggWhiteCount = fetchExistingInfo.eggWhiteCount;

        await updateData.save();
        getPatientInfo.discharge = updateData;
        await getPatientInfo.save();

        res.status(200).json({
            status : 'success',
            data : updateData
        });
    }
);

exports.deleteDischarge = catchAsynsc(
    async(req, res, next) => {
        const deleteInfo = await discharge.findByIdAndRemove(req.body.id);
        
        res.status(200).json({
            status : 'success',
            data: deleteInfo
        })
    }
);

exports.getAllDischarge = catchAsynsc(
    async(req, res, next) => {
        const getInfo = await discharge.find({patientId: req.params.id});
        
        res.status(200).json({
            status : 'success',
            data: getInfo
        })
    }
);


// ----------------------------- INTIMACY AND PHASES --------------------------------

exports.createIntimacyAndPhases = catchAsynsc(
    async(req, res, next) => {
        const createInfo = await intimacyAndPhases.create(req.body);
        const getPatientInfo = await patient.findById(req.body.patientId);
        const fetchExistingInfo = await intimacyAndPhases.findById(getPatientInfo.intimacyAndPhases);

        const date = new Date();
        const d = date.getTime();
        if(d <= createInfo.folicularStartDate.getTime() && d >=createInfo.folicularEndDate.getTime()){
            createInfo.folicularCount = fetchExistingInfo.folicularCount + 1;
        }else if(d <= createInfo.ovulationStartDate.getTime() && d >= createInfo.ovulationEndDate.getTime()){
            createInfo.ovulationCount = fetchExistingInfo.ovulationCount + 1;
        }else if(d <= createInfo.leutalStartDate.getTime() && d >= createInfo.leutalEndDate.getTime()){
            createInfo.leutalCount = fetchExistingInfo.leutalCount + 1;
        }else if(d <= createInfo.fertileStartDate.getTime() && d >= createInfo.fertileStartDate.getTime()){
            createInfo.fertileCount = fetchExistingInfo.fertileCount + 1;
        }else if(d <= createInfo.periodStartDate.getTime() && d >= createInfo.periodEndDate.getTime()){
            createInfo.periodCount = fetchExistingInfo.periodCount + 1;
        }
        if(fetchExistingInfo == null)
        {
            if(createInfo.protected == true)
            {
                createInfo.protectedCount = 1;
            }
            if(createInfo.unProtected == true)
            {
                createInfo.unProtectedCount = 1;
            }
        } else{
            if(createInfo.protected == true)
            {
                createInfo.protectedCount = fetchExistingInfo.protectedCount + 1;
            }
            else if(createInfo.unProtected == true){
                createInfo.unProtectedCount = fetchExistingInfo.unProtectedCount + 1;
            }
        }
        await createInfo.save();
        getPatientInfo.intimacyAndPhases = createInfo;
        await getPatientInfo.save();

        res.status(200).json({
            status : 'success',
            data : createInfo
        });
    }
);

exports.getIntimacyAndPhases = catchAsynsc(
    async(req, res, next) => {
        const getInfo = await intimacyAndPhases.findById(req.params.id);
        
        res.status(200).json({
            status : 'success',
            data: getInfo
        })
    }
);

exports.updateIntimacyAndPhases = catchAsynsc(
    async(req, res, next) => {
        

        const updateData = await intimacyAndPhases.findByIdAndUpdate(
            req.body.id,req.body,{
                new: true,
                runValidators: true
            }
        );
        const getPatientInfo = await patient.findById(req.body.patientId);
        const fetchExistingInfo = await intimacyAndPhases.findById(getPatientInfo.intimacyAndPhases);

        const date = new Date();
        const d = date.getTime();

        if(d <= folicularStartDate.getTime() && d >= folicularEndDate.getTime()){
            updateData.folicularCount = fetchExistingInfo.folicularCount + 1;
        }else if(d <= ovulationStartDate.getTime() && d >= ovulationEndDate.getTime()){
            updateData.ovulationCount = fetchExistingInfo.ovulationCount + 1;
        }else if(d <= leutalStartDate.getTime() && d >= leutalEndDate.getTime()){
            updateData.leutalCount = fetchExistingInfo.leutalCount + 1;
        }else if(d <= fertileStartDate.getTime() && d >= fertileStartDate.getTime()){
            updateData.fertileCount = fetchExistingInfo.fertileCount + 1;
        }else if(d <= periodStartDate.getTime() && d >= periodEndDate.getTime()){
            updateData.periodCount = fetchExistingInfo.periodCount + 1;
        }

        if(updateData.protected == true)
        {
            updateData.protectedCount = fetchExistingInfo.protectedCount + 1;
        }
        else if(updateData.unProtected == true){
            createInfo.unProtectedCount = fetchExistingInfo.unProtectedCount + 1;
        }

        await createInfo.save();
        getPatientInfo.intimacyAndPhases = updateData;
        await getPatientInfo.save();

        res.status(200).json({
            status : 'success',
            data : updateData
        });
    }
);

exports.deleteIntimacyAndPhases = catchAsynsc(
    async(req, res, next) => {
        const deleteInfo = await intimacyAndPhases.findByIdAndRemove(req.body.id);
        
        res.status(200).json({
            status : 'success',
            data: deleteInfo
        })
    }
);

exports.getAllIntimacyAndPhases = catchAsynsc(
    async(req, res, next) => {
        const getInfo = await intimacyAndPhases.find({patientId: req.params.id});
        
        res.status(200).json({
            status : 'success',
            data: getInfo
        })
    }
);



// -----------------------------Pregnancy Test -------------------------------------

exports.createPregnancyTest = catchAsynsc(
    async(req, res, next) => {
        const createInfo = await pregnancyTest.create(req.body);
        const getPatientInfo = await patient.findById(req.body.patientId);
        
        getPatientInfo.pregnancyTest = createInfo;
        await getPatientInfo.save();

        res.status(200).json({
            status : 'success',
            data : createInfo
        });
    }
);

exports.getPregnancyTest = catchAsynsc(
    async(req, res, next) => {
        const getInfo = await pregnancyTest.findById(req.params.id);
        
        res.status(200).json({
            status : 'success',
            data: getInfo
        })
    }
);

exports.updatePregnancyTest = catchAsynsc(
    async(req, res, next) => {
        

        const updateData = await pregnancyTest.findByIdAndUpdate(
            req.body.id,req.body,{
                new: true,
                runValidators: true
            }
        );

        const getPatientInfo = await patient.findById(req.body.patientId);
        
        getPatientInfo.pregnancyTest = updateData;
        await getPatientInfo.save();

        res.status(200).json({
            status : 'success',
            data : updateData
        });
    }
);

exports.deletePregnancyTest = catchAsynsc(
    async(req, res, next) => {
        const deleteInfo = await pregnancyTest.findByIdAndRemove(req.body.id);
        
        res.status(200).json({
            status : 'success',
            data: deleteInfo
        })
    }
);

exports.getAllPregnancyTest = catchAsynsc(
    async(req, res, next) => {
        const getInfo = await pregnancyTest.find({patientId: req.params.id});
        
        res.status(200).json({
            status : 'success',
            data: getInfo
        })
    }
);


// ----------------------- OVULATION TEST ----------------------------



exports.createOvulationTest = catchAsynsc(
    async(req, res, next) => {
        const createInfo = await ovulationTest.create(req.body);
        const getPatientInfo = await patient.findById(req.body.patientId);
        
        getPatientInfo.ovulationTest = createInfo;
        await getPatientInfo.save();

        res.status(200).json({
            status : 'success',
            data : createInfo
        });
    }
);

exports.getOvulationTest = catchAsynsc(
    async(req, res, next) => {
        const getInfo = await ovulationTest.findById(req.params.id);
        
        res.status(200).json({
            status : 'success',
            data: getInfo
        })
    }
);

exports.updateOvulationTest = catchAsynsc(
    async(req, res, next) => {
        

        const updateData = await ovulationTest.findByIdAndUpdate(
            req.body.id,req.body,{
                new: true,
                runValidators: true
            }
        );

        const getPatientInfo = await patient.findById(req.body.patientId);
        
        getPatientInfo.ovulationTest = updateData;
        await getPatientInfo.save();

        res.status(200).json({
            status : 'success',
            data : updateData
        });
    }
);

exports.deleteOvulationTest = catchAsynsc(
    async(req, res, next) => {
        const deleteInfo = await ovulationTest.findByIdAndRemove(req.body.id);
        
        res.status(200).json({
            status : 'success',
            data: deleteInfo
        })
    }
);

exports.getAllOvulationTest = catchAsynsc(
    async(req, res, next) => {
        const getInfo = await ovulationTest.find({patientId: req.params.id});
        
        res.status(200).json({
            status : 'success',
            data: getInfo
        })
    }
);



// -------------------------------------- NOTES ---------------------------------


exports.createNotes = catchAsynsc(
    async(req, res, next) => {
        const createInfo = await notes.create(req.body);
        const getPatientInfo = await patient.findById(req.body.patientId);
        
        getPatientInfo.notes = createInfo;
        await getPatientInfo.save();

        res.status(200).json({
            status : 'success',
            data : createInfo
        });
    }
);

exports.getNotes = catchAsynsc(
    async(req, res, next) => {
        const getInfo = await notes.findById(req.params.id);
        
        res.status(200).json({
            status : 'success',
            data: getInfo
        })
    }
);

exports.updateNotes = catchAsynsc(
    async(req, res, next) => {
        

        const updateData = await notes.findByIdAndUpdate(
            req.body.id,req.body,{
                new: true,
                runValidators: true
            }
        );

        const getPatientInfo = await patient.findById(req.body.patientId);
        
        getPatientInfo.notes = updateData;
        await getPatientInfo.save();

        res.status(200).json({
            status : 'success',
            data : updateData
        });
    }
);

exports.deleteNotes = catchAsynsc(
    async(req, res, next) => {
        const deleteInfo = await notes.findByIdAndRemove(req.body.id);
        
        res.status(200).json({
            status : 'success',
            data: deleteInfo
        })
    }
);

exports.getAllNotes = catchAsynsc(
    async(req, res, next) => {
        const getInfo = await notes.find({patientId: req.params.id});
        
        res.status(200).json({
            status : 'success',
            data: getInfo
        })
    }
);

// ----------------------------- Pills -------------------------------------

exports.createPills = catchAsynsc(
    async(req, res, next) => {
        const createInfo = await pills.create(req.body);
        const getPatientInfo = await patient.findById(req.body.patientId);
        
        getPatientInfo.pills = createInfo;
        await getPatientInfo.save();

        res.status(200).json({
            status : 'success',
            data : createInfo
        });
    }
);

exports.getAllPills = catchAsynsc(
    async(req, res, next) => {
        const getInfo = await pills.find({patientId: req.params.id});
        
        res.status(200).json({
            status : 'success',
            data: getInfo
        })
    }
);

exports.getPills = catchAsynsc(
    async(req, res, next) => {
        const getInfo = await pills.findById(req.params.id);
        
        res.status(200).json({
            status : 'success',
            data: getInfo
        })
    }
);