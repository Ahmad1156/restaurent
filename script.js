document.getElementById('contact-form').addEventListener('submit',(e)=>{
       e.preventDefault();
       let container=document.getElementById('message');
       const div = document.createElement('div');
        div.className = "alert alert-success";
        div.appendChild(document.createTextNode('Email sent successfully'));
        container.appendChild(div)
       setTimeout(() => document.querySelector('.alert').remove(), 3000);
       setTimeout(() => {
            document.getElementById('cf-name').value='';
            document.getElementById('cf-email').value='';
            document.getElementById('cf-subject').value='';
            document.getElementById('cf-message').value=''
       }, 3000);

});
fetch('https://firstrestaurant.herokuapp.com/chefs')
  .then(response => response.json())
  .then(json => {
    let row =document.getElementById('row');
    json.chefs.forEach(chef => {
        
    let div=document.createElement('div');

    div.innerHTML=` <div class="team-thumb wow fadeInUp" data-wow-delay="0.2s">
    <img src="${chef.images}" class="img-responsive" alt="">
         <div class="team-hover">
              <div class="team-item">
                   <h4>${chef.description}</h4> 
                   <ul class="social-icon">
                        <li><a href="#" class="fa fa-linkedin-square"></a></li>
                        <li><a href="#" class="fa fa-envelope-o"></a></li>
                   </ul>
              </div>
         </div>
         </div>
         <div class="team-info">
             <h3>${chef.Name}</h3>
              <p>${chef.Role}</p>
          </div>
        </div>`

        div.classList="col-md-4 col-sm-4";

        row.appendChild(div);
});
})
fetch('https://firstrestaurant.herokuapp.com/dishes')
  .then(response => response.json())
  .then(json => {

    let row =document.getElementById('row1');

    json.Dishes.forEach(dish=>{

    let div =document.createElement('div');
    div.className="col-md-4 col-sm-6";
    div.innerHTML=`<div class="menu-thumb">
    <a href="#" class="image-popup" title="${dish.Title}">
         <img src="${dish.images}" class="img-responsive" alt="">

         <div class="menu-info">
              <div class="menu-item">
                   <h3>${dish.Name}</h3>
                   <p>${dish.credentials}</p>
              </div>
              <div class="menu-price">
                   <span>${dish.price}</span>
              </div>
         </div>
      </a>
     </div>`

     row.appendChild(div);

    })

  });
//   fetch('https://firstrestaurant.herokuapp.com/Ratings')
//   .then(response => response.json())
//   .then(json => {
    
//      var counter=0;

//      let slider=document.getElementById('carousel-inner');
   
//      console.log(slider);
   
   
//        json.Testimonials.forEach(customer=> {
   
//          counter++;
   
//         let section=document.createElement('div');
   
//         if(counter==1){
//            section.className="carousel-item active";
//         }
//         else{
//           section.className="carousel-item";
//         }
        
//         section.innerHTML=` <img src="`+customer.images+`" class="d-block w-100" alt="...">
//         <div class="carousel-caption d-none d-md-block">
//           <h5>`+customer.Name+`</h5>
//           <p>`+customer.rating+`</p>`;
   
//         slider.appendChild(section);
        
   
//      })
//    })
