
let restaurants = [];
async function loadRestaurantsFromSheet() {
  try {
    const SHEET_API_URL = 'https://sheetdb.io/api/v1/fqgspql2cs4gf'; 
    
    const response = await fetch(SHEET_API_URL);
    const data = await response.json();
    
    restaurants = data.map(item => {
      let parsedMenu = [];
      if (item.menu) {
        parsedMenu = item.menu.split('|').map(m => {
          let parts = m.split(':');
          return { name: parts[0] ? parts[0].trim() : '', price: parts[1] ? parts[1].trim() : '' };
        });
      }

      return {
        id: item.id,
        name: item.name,
        category: item.category,
        lat: parseFloat(item.lat),
        lng: parseFloat(item.lng),
        address: item.address,
        rating: item.rating,
        hours: item.hours,
        menu: parsedMenu
      };
    });

    initCategories();
    renderList(restaurants);
    initCheckboxes();
    
  } catch (error) {
    console.error("Lỗi khi tải dữ liệu từ Google Sheets:", error);
    document.getElementById('foodList').innerHTML = '<div style="text-align:center; padding: 20px; color: red;">Lỗi tải dữ liệu quán ăn!</div>';
  }
}

loadRestaurantsFromSheet();
