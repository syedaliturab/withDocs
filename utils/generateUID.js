var stateMap = {
    "Andhra Pradesh" : "00",
    "AP" : "00",
    "Andhra Pradesh(AP)" : "00",
    "Arunachal Pradesh" : "01",
    "AR" : "01",
    "Arunachal Pradesh(AR)" : "01",
    "Assam(AS)" : "02",
    "AS" : "02",
    "Assam" : "02",
    "Bihar(BR)" : "03",
    "Bihar" : "03",
    "BR" : "03",
    "Chhattisgarh(CG)" : "04",
    "Chhattisgarh" : "04",
    "CG" : "04",
    "Goa(GA)" : "05",
    "Goa" : "05",
    "GA" : "05",
    "Gujarat(GJ)" : "06",
    "Gujarat" : "06",
    "GJ" : "06",
    "Haryana(HR)" : "07",
    "Haryana" : "07",
    "HR" : "07",
    "Himachal Pradesh(HP)" : "08",
    "Himachal Pradesh" : "08",
    "HP" : "08",
    "Jammu & Kashmir(JK)" : "09",
    "Jammu & Kashmir" : "09",
    "JK" : "09",
    "Jharkhand(JH)" : "10",
    "Jharkhand" : "10",
    "JH" : "10",
    "Karnataka(KA)" : "11", 
    "Karnataka" : "11",
    "KA" : "11",
    "Kerala(KL)" : "12",
    "Kerala" : "12",
    "KL" : "12",
    "Madhya Pradesh(MP)" : "13",
    "Madhya Pradesh" : "13",
    "MP" : "13",
    "Maharashtra(MH)" : "14",
    "Maharashtra" : "14",
    "MH" : "14",
    "Manipur(MN)" : "15",
    "Manipur" : "15",
    "MN" : "15",
    "Meghalaya(ML)" : "16",
    "Meghalaya" : "16", 
    "ML" : "16",
    "Mizoram(MZ)" : "17",
    "Mizoram" : "17",
    "MZ" : "17",
    "Nagaland(NL)" : "18",
    "Nagaland" : "18",
    "NL" : "18",
    "Odisha(OR)" : "19",
    "Odisha" : "19",
    "OR" : "19",
    "Punjab(PB)" : "20",
    "Punjab" : "20",
    "PB" : "20",
    "Rajasthan(RJ)" : "21",
    "Rajasthan" : "21",
    "RJ" : "21",
    "Sikkim(SK)" : "22",
    "Sikkim" : "22",
    "SK" : "22",
    "Tamil Nadu(TN)" : "23",
    "Tamil Nadu" : "23",
    "TN" : "23",
    "Telangana(TS)" : "24",
    "Telangana" : "24", 
    "TS" : "24",
    "Tripura(TR)" : "25",
    "Tripura" : "25",
    "TR" : "25",
    "Uttar Pradesh(UP)" : "26",
    "Uttar Pradesh" : "26",
    "UP" : "26",
    "Uttarakhand(UK)" : "27",
    "Uttarakhand" : "27",
    "UK" : "27",
    "West Bengal(WB)" : "28",
    "West Bengal" : "28",
    "WB" : "28",
    "Andaman and Nicobar Islands(AN)" : "29",
    "Andaman and Nicobar Islands" : "29",
    "AN" : "29",
    "Chandigarh(CH)" : "30",
    "Chandigarh" : "30",
    "CH" : "30",
    "Dadra and Nagar Haveli(DD)" : "31",
    "Dadra and Nagar Haveli" : "31",
    "DD" : "31",
    "Delhi(DL)" : "32",
    "Delhi" : "32",
    "DL" : "32",
    "Ladakh(LA)" : "33",
    "Ladakh" : "33",
    "LA" : "33",
    "Lakshadweep(LD)" : "34",
    "Lakshadweep" : "34",
    "LD" : "34",
    "Puducherry(PY)" : "35",
    "Puducherry" : "35",
    "PY" : "35"
};
var eduMap = {
	"B.V.Sc" : "00", // Veterinar
	"BAMS" : "01", // Ayurvedic
	"BDS" : "02", // Dentist
	"BHMS" : "03", // Homeopathy
	"BSMS" : "04", // Siddha
	"BUMS" : "05", //  Unani
	"BYNS" : "06", // Ydga and Naturopathy
	"MCPS" : "07", // Allopathy
	"MBBS" : "08" // Allopathy
};
var generateUID = function(Doctor, TotalCount){
	
	var uid = ""; // String that will be Transformed into UID

	var registrationDate = new Date(Doctor.date);

	if(registrationDate.getDate() < 10)
		uid = uid + "0";  // Appending a Zero to get the (DD) Day 01, 02, ... 09, 10, 11, ... 31 format

	uid = uid + registrationDate.getDate().toString(); // DD

	if(registrationDate.getMonth() < 10)
		uid = uid + "0"; // Appending a Zero to get the (MM) Month 00, 01, ...09, 10, 11 format 

	uid = uid + registrationDate.getMonth().toString();	

	uid = uid + registrationDate.getYear().toString(); // (YY) Year 

	if(Doctor.gender == "male") // 0 for Male
		uid = uid + "0"; 
	else if(Doctor.gender == "female") // 1 for Female
		uid = uid + "1";
	else
	{
		uid = uid + "2"; // To Do : If required, will be handled in future.
	}

	uid = uid + stateMap[Doctor.state]; // State which Doctor Belongs to

	uid = uid + eduMap[Doctor.education[0].degree]; // Primary Degree

	TotalCount = TotalCount + 1;
	var tempString =  TotalCount.toString();
	var diff = 9 - tempString.length;
	while(diff--)
	{
		uid = uid + "0";
	}
	uid = uid + tempString;

	//Doctor._id = uid; // Finally Storing
	return uid;    // Return JSON
};

module.exports.generateUID = generateUID;
