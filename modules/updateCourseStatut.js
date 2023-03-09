// environnement variables
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;




const updateCourseStatut = async (statutString,courseId) => {

    const updateBody = {
        Statut:statutString,
    };

    try {
        const response = await fetch(`${BACKEND_URL}/airtable/courses/${courseId}`,{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(updateBody), 
            
        })
        const updatedCourse = await response.json();
        
        if (updatedCourse.data.fields.Statut===statutString){
            console.log('update succeeded');
           
            return true
        } else {
            console.log('update failed')
            return false
        }
    
    } catch (error) {
        console.log(error)
    }
   

   
};

module.exports = { updateCourseStatut };