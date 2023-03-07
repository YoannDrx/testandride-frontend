// environnement variables
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

// Fonction pour lancer l'appel téléphonique
const updateCourseStatut = async (statutString,courseId) => {

    const updatedStatut = {Statut:statutString};
    console.log('updating statut of course ',courseId,' to ',statutString);
    const response = await fetch(`${BACKEND_URL}/airtable/courses/${courseId}`,{
        method:'POST',
        'Content-Type':'application/json',
        body:JSON.stringify(updatedStatut)
    })
    const updatedCourse = await response.json();
    if (updatedCourse.result){
        console.log('update succeeded')
        return true
    } else {
        console.log('update failed')
        return false
    }

};

module.exports = { updateCourseStatut };