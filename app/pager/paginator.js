
angular.module('paginator',[]).factory('Paginator', function(){
    return function(currentPage,totalPage,goToPage) {
        var paginator = {
            currentPage: currentPage,

            next: function() {
                if (this.currentPage < totalPage) {
                    this.currentPage++;
                }
                return this.currentPage;
            },

            prev: function() {
                if (this.currentPage > 1) {
                    this.currentPage--;
                }
                return this.currentPage;
            },

            first: function() {
                this.currentPage = 1;
                return this.currentPage;
            },

            end: function() {
                this.currentPage = totalPage;
                return this.currentPage;
            },

            go: function() {
                this.currentPage = goToPage;
                return this.currentPage;
            }
        };

        return paginator;
    };
});
