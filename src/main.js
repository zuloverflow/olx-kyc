new Vue({
    el: '#app',
    data() {
        return {
            isLoading: false,
            v: 0,
            text: ''
        }
    },
    methods: {
        async init() {
            this.isLoading = true
            const _self = this
            const workerPromise = Tesseract.createWorker('eng', 1, {
                logger: ({ progress, status }) => {
                    if (status === "recognizing text") {
                        _self.v = (progress * 100)
                        console.log(progress)
                    }
                },
            });
            const imageUrl = "https://apollo.olx.co.id/v1/files/eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmbiI6IjY1ZGQ2ZmIwNWE1NGItS1lDSUQiLCJpc3MiOiJhdXRoMCJ9.z8pcjAiXmVS3NNBrSjvx0mnFqX4KOKAFGxO5fXXMZf4/image"
            const worker = await workerPromise;
            const ret = await worker.recognize(
                imageUrl
            );
            // console.log(ret.data);
            this.text = ret.data.text
            await worker.terminate();
            this.isLoading = false
        }
    },
    mounted() {
        console.log(this)
        this.init()
    }
})