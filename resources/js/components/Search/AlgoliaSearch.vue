<template>

    <div class="aa-input-container" id="aa-input-container">
        <input type="search" id="aa-search-input" class="aa-input-search" placeholder="Поиск" name="search"
               autocomplete="off" />
        <svg class="aa-input-icon" viewBox="654 -372 1664 1664">
            <path d="M1806,332c0-123.3-43.8-228.8-131.5-316.5C1586.8-72.2,1481.3-116,1358-116s-228.8,43.8-316.5,131.5  C953.8,103.2,910,208.7,910,332s43.8,228.8,131.5,316.5C1129.2,736.2,1234.7,780,1358,780s228.8-43.8,316.5-131.5  C1762.2,560.8,1806,455.3,1806,332z M2318,1164c0,34.7-12.7,64.7-38,90s-55.3,38-90,38c-36,0-66-12.7-90-38l-343-342  c-119.3,82.7-252.3,124-399,124c-95.3,0-186.5-18.5-273.5-55.5s-162-87-225-150s-113-138-150-225S654,427.3,654,332  s18.5-186.5,55.5-273.5s87-162,150-225s138-113,225-150S1262.7-372,1358-372s186.5,18.5,273.5,55.5s162,87,225,150s113,138,150,225  S2062,236.7,2062,332c0,146.7-41.3,279.7-124,399l343,343C2305.7,1098.7,2318,1128.7,2318,1164z" />
        </svg>
    </div>
</template>

<script>
    const algoliaSearch = () => import('algoliasearch/lite');
    export default {
        components: {algoliaSearch},
        data () {
            return {
            }
        },
        mounted() {
            const client = algoliasearch('YI1NJR2OIJ', '0ad7c936f8e34be801b818de7c764e87');
            const index = client.initIndex('vinex.products');
            let enterButton = false;

            //initialize autocomplete on search input (ID selector must match)
            autocomplete('#aa-search-input',
                { hint: false }, {
                    source: autocomplete.sources.hits(index, { hitsPerPage: 10 }),
                    //value to be displayed in input control after user's suggestion selection
                    displayKey: 'name',
                    //hash of templates used when rendering dataset
                    templates: {
                        //'suggestion' templating function used to render a single suggestion
                        suggestion: function (suggestion) {
                            const markup = `
                        <div class="algolia-result">
                            <span>
                                <img src="${suggestion.images[0]}" alt="img" width="20px" height="20px" class="algolia-thumb">
                                ${suggestion._highlightResult.name.value}
                            </span>
                        </div>
                    `;

                            return markup;
                        },
                        empty: function (result) {
                            return 'Не нашлось результатов по "' + result.query + '"';
                        }
                    }
                }).on('autocomplete:selected', function (event, suggestion, dataset) {
                window.location.href = window.location.origin + '/product/' + suggestion.slug;
                enterButton = true;
            }).on('keyup', function(event) {
                if (event.keyCode == 13 && !enterButton) {
                    window.location.href = window.location.origin + '/search?q=' + document.getElementById('aa-search-input').value;
                }
            });        }
    }

</script>


<style scoped>
    .aa-input-container {
        display: inline-block;
        position: relative; }
    .aa-input-search {
        width: 350px;
        padding: 12px 28px 12px 12px;
        border: 2px solid #e4e4e4;
        border-radius: 4px;
        -webkit-transition: .2s;
        transition: .2s;
        font-family: "Montserrat", sans-serif;
        box-shadow: 4px 4px 0 rgba(241, 241, 241, 0.35);
        font-size: 12px;
        box-sizing: border-box;
        color: #333;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none; }
    .aa-input-search::-webkit-search-decoration, .aa-input-search::-webkit-search-cancel-button, .aa-input-search::-webkit-search-results-button, .aa-input-search::-webkit-search-results-decoration {
        display: none; }
    .aa-input-search:focus {
        cursor: pointer;
        outline: 0;
        border-color: #3a96cf;
        box-shadow: 4px 4px 0 rgba(58, 150, 207, 0.1); }
    .aa-input-icon {
        height: 16px;
        width: 16px;
        position: absolute;
        top: 50%;
        right: 16px;
        -webkit-transform: translateY(-50%);
        transform: translateY(-50%);
        fill: #e4e4e4; }
    .aa-hint {
        color: #e4e4e4; }
    .aa-dropdown-menu {
        background-color: red;
        border: 2px solid rgba(228, 228, 228, 0.6);
        border-top-width: 1px;
        font-family: "Montserrat", sans-serif;
        width: 400px;
        margin-top: 10px;
        box-shadow: 4px 4px 0 rgba(241, 241, 241, 0.35);
        font-size: 18px;
        border-radius: 4px;
        box-sizing: border-box;
        word-wrap: break-word; }
    .aa-suggestion {
        padding: 12px;
        border-top: 1px solid rgba(228, 228, 228, 0.6);
        cursor: pointer;
        -webkit-transition: .2s;
        transition: .2s;
        /* display: -webkit-box;
        display: -ms-flexbox;
        display: flex; */
        -webkit-box-pack: justify;
        -ms-flex-pack: justify;
        justify-content: space-between;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center; }
    .aa-suggestion:hover, .aa-suggestion.aa-cursor {
        background-color: rgba(241, 241, 241, 0.65); }
    .aa-suggestion > span:first-child {
        color: #333; }
    .aa-suggestion > span:last-child {
        text-transform: uppercase;
        color: #a9a9a9; }
    .aa-suggestion span em {
        font-weight: 700;
        font-style: normal;
        background-color: rgba(58, 150, 207, 0.3);
        padding: 2px 0 2px 2px; }

    .algolia-result {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .algolia-thumb {
        max-width: 35px;
        max-height: 35px;
    }

    .algolia-details {
        color: #000;
    }

    .ais-hits--item em {
        background-color: rgba(58, 150, 207, 0.3);
    }
</style>
