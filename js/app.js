

// Load All data from link 
const loadAllData = async () => {
    const url = `https://openapi.programming-hero.com/api/ai/tools`
    const res = await fetch(url);
    const allData = await res.json();
    showAllData(allData.data.tools.slice(0, 6));
};

// display All data 
const showAllData = (allData) => {
    const cardContainer = document.getElementById('card-container');

    cardContainer.innerHTML = '';
    // loop through all data 
    allData.forEach(singleData => {
        // console.log(singleData);

        // destructuring object 
        const { features, name, published_in, id, image } = singleData;
        // add data into cards 
        cardContainer.innerHTML += `
        <div class="card w-full md:w-4/5 bg-base-100 shadow-xl mx-auto">
            <figure><img src="${image}" alt="Shoes" /></figure>
            <div class="card-body p-10">
                <h2 class="card-title font-bold text-2xl">Features</h2>

                <ol class="list-decimal  text-gray-500">
                    <li>${features[0] ? features[0] : 'No Data Found'}</li>
                    <li>${features[1] ? features[1] : 'No Data Found'}</li>
                    <li>${features[2] ? features[2] : 'No Data Found'}</li>
                </ol>

                <hr class="my-4">

                <div class="flex justify-between items-center">
                    <div class="space-y-2">
                        <h2 class="font-bold text-xl">${name}</h2>
                        <p class=" text-gray-500"><i class="fa-solid fa-calendar"></i>  ${published_in}</p>
                    </div>
                    <div class="card-actions justify-end">
                        <label  for="my-modal">
                             <i class="fa-solid fa-arrow-right bg-red-100 text-red-400 p-3 rounded-full hover:bg-red-300 hover:text-white" onClick="modalData('${id}')"></i>
                        </label>
                    </div>
                </div>
                
            </div>
        </div>
        `
    })
    // loading end 
    toggleLoader(false)
};


// loader function 
const toggleLoader = isLoading => {
    const loadingSection = document.getElementById('loader');
    if (isLoading) {
        loadingSection.classList.remove('hidden')
    }
    else {
        loadingSection.classList.add('hidden')
    }
};
// loading start 
toggleLoader(true);



// Fetch single data 
const modalData = async (dataID) => {
    const url = `https://openapi.programming-hero.com/api/ai/tool/${dataID}`
    const res = await fetch(url);
    const modalData = await res.json();
    showModalData(modalData.data);
};


// show modal data 
const showModalData = modalData => {
    console.log(modalData)

    // Destructuring object 
    const { features, description, pricing, image_link, input_output_examples, integrations, accuracy } = modalData;

    // accuracy function 
    const accuracyFunction = () => {
        if (accuracy.score) {
            template = `<p id="accuracy" class="absolute top-6 right-7 bg-red-500 font-semibold text-white py-1 px-3 rounded-md text-sm">${accuracy.score * 100 + "%" + " " + "Accuracy"
                }</p>`;
        } else {
            template = "";
        }
        return template;
    };




    //Getting features from object
    const singleDataFeatures = Object.entries(features);

    const modalContainer = document.getElementById('modal');
    modalContainer.innerHTML = '';
    modalContainer.innerHTML += `
    <div
        class=" relative flex gap-5 modal-box w-11/12 max-w-5xl  justify-center flex-col lg:flex-row h-fit md:py-20  md:px-14">

        <label for="my-modal" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>

        <div class="bg-red-50 lg:p-5 w-fit lg:w-[440px] rounded-lg border-2 border-red-400 p-5  ">
            <h1 id="modal-title" class="text-lg font-semibold lg:pt-0 pt-96">${description}</h1>
            <div class="flex font-semibold gap-2 py-4  text-center justify-center text-base lg:flex-row flex-col">
                <div class="lg:w-32 bg-white p-5 rounded-lg ">
                    <h1 class="text-green-500">${pricing[0].price ? pricing[0].price : 'Free of Cost'} <br>${pricing[0].plan}</h1>
                </div>
                <div class="lg:w-32 bg-white p-5 rounded-lg">
                    <h1 class="text-orange-500">${pricing[1].price ? pricing[1].price : 'Free of Cost'} <br>${pricing[1].plan}</h1>
                </div>
                <div class="lg:w-32 bg-white p-5 rounded-lg">
                    <h1 class="text-red-500">${pricing[2].price ? pricing[2].price : 'Free of Cost'} <br>${pricing[2].plan}</h1>
                </div>
            </div>
            <!-- --- -->
            <div class="flex justify-evenly lg:flex-row flex-col">
                <div>
                    <h1 class=" font-bold text-lg">Features</h1>
                    <ul class="text-slate-500 list-disc p-2">
                        <li>${singleDataFeatures[0][1].feature_name ? singleDataFeatures[0][1].feature_name : 'No Data Found'}</li>
                        <li>${singleDataFeatures[1][1].feature_name ? singleDataFeatures[1][1].feature_name : 'No Data Found'}</li>
                        <li>${singleDataFeatures[2][1].feature_name ? singleDataFeatures[2][1].feature_name : 'No Data Found'}</li>
                    </ul>
                </div>
                <div>
                    <h1 class=" font-bold text-lg">Integration</h1>
                    <ul class="text-slate-500 list-disc p-4">
                        <li>${integrations[0] ? integrations[0] : 'No Data Found'}</li>
                        <li>${integrations[1] ? integrations[1] : 'No Data Found'}</li>
                        <li>${integrations[2] ? integrations[2] : 'No Data Found'}</li>
                    </ul>
                </div>
            </div>
        </div>
        <!--  ------------- -->
        <div class="lg:w-[440px] w-fit border-2 rounded-lg text-center p-5 space-y-2 relative">
            <img class="mx-auto  rounded-lg w-fit" src="${image_link[0]}" alt="" />
            <h1 class="font-bold">${input_output_examples[0].input}</h1>
            <p>${input_output_examples[0].output}</p>
            <div>
            ${accuracyFunction()}
            </div>
        </div>
    </div>
    `
}



// see more function
const seeMoreData = async () => {
    const url = `https://openapi.programming-hero.com/api/ai/tools`
    const res = await fetch(url);
    const allData = await res.json();
    showAllData(allData.data.tools);
    const seeALLButton = document.getElementById('see-more-btn');
    seeALLButton.classList.add('hidden')
}