export class LoaderUtil {
    static SPINNER_DELAY_MS = 500;
    static isSpinnerDisplayed = false;
    static spinnerCount = 0;

    static instance = new LoaderUtil();
    static setIsLoading(loading, message){};

    static show(delay) {
        this.spinnerCount++;

        if (!this.isSpinnerDisplayed) {
            this.isSpinnerDisplayed = true;
            setTimeout(() => {
                if (this.spinnerCount >= 1) {
                    this.instance.setIsLoading(true);
                }
            }, delay ?? LoaderUtil.SPINNER_DELAY_MS);
        }
    }

    static async showAsync(message) {
        this.spinnerCount++;

        if (this.spinnerCount === 1) {
            this.instance.setIsLoading(true, message);
        }

        return await new Promise(resolve => setTimeout(resolve, 0));
    }

    static hide() {
        if (this.spinnerCount > 0) {
            this.spinnerCount--;

            if (this.spinnerCount === 0) {
                this.isSpinnerDisplayed = false;

                this.instance.setIsLoading(false);
            }
        }
    }
}