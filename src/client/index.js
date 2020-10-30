import { getTravelInfo } from "./js/handleSearch";
import { travelHistory } from "./js/handleHistory";
import { searchEnter } from "./js/handleSearch"


import './styles/body.scss';
import './styles/header.scss';
import './styles/form.scss';
import './styles/footer.scss';
import './styles/modal.scss';


window.addEventListener('DOMContentLoaded', searchEnter);


export {
    getTravelInfo,
    travelHistory,
    searchEnter
};