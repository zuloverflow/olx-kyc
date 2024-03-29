const links = [];
let indexFinal = 0
const queue = new Rx.Subject();
const allData = []
let title = $('.card-title').eq(1).text()

async function scrapeData() {
    $('body').append(
        `<div id="app" style="position:sticky; bottom:0; margin-left:75%; padding:0px;">
            <div style="background-color: #28a745; text-align: right;" class="abay">
                abay scraper
            </div>
            <section class="m-4">
            <b-notification :closable="false">
                <b-loading :is-full-page="false" v-model="isLoading">
                </b-loading>
                <b-field label="Result">
                    <b-input maxlength="200" type="textarea" v-model="text"></b-input>
                </b-field>
            </b-notification>
            <b-field v-if="isLoading">
                <b-progress type="is-success" :value="v" show-value format="percent"></b-progress>
            </b-field>
        </section>      
        </div>
        `
    )

}
scrapeData()