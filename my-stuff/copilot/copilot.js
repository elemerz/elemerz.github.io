var Computer= {
    sumOfFirstNOdds: function(n) {
        if (n === 1) {
            return 1;
        } else {
            return 2*n -1 + this.sumOfFirstNOdds(n - 1);
        }
    },
    logSumOfFirstNOdds: function(n) {
        console.log(`sumOfFirst(${n})=`, this.sumOfFirstNOdds(n));
    }
};