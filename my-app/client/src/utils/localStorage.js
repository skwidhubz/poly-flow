export const getSavedPolyIds = () => {
    const savedPolyIds = localStorage.getItem('saved_polys')
      ? JSON.parse(localStorage.getItem('saved_polys'))
      : [];
  
    return savedPolyIds;
  };
  
  export const savePolyIds = (polyIdArr) => {
    if (polyIdArr.length) {
      localStorage.setItem('saved_polys', JSON.stringify(polyIdArr));
    } else {
      localStorage.removeItem('saved_polys');
    }
  };
  
  export const removePolyId = (polyId) => {
    const savedPolyIds = localStorage.getItem('saved_polys')
      ? JSON.parse(localStorage.getItem('saved_polys'))
      : null;
  
    if (!savedPolyIds) {
      return false;
    }
  
    const updatedSavedPolyIds = savedPolyIds?.filter((savedPolyId) => savedPolyId !== polyId);
    localStorage.setItem('saved_polys', JSON.stringify(updatedSavedPolyIds));
  
    return true;
  };
  