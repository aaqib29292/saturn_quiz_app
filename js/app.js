(function(){

	var app = angular.module('myQuiz', []);

  app.controller('QuizController', ['$scope', '$http', '$sce', function ($scope, $http, $sce) {

    $scope.score = 0;
    $scope.activeQuestion = -1;
    $scope.activeQuestionAnswered = 0;
    $scope.percentage = 0;

    $http.get('quiz_data.json').then( function(quizData) {
      $scope.myQuestions = quizData.data;
      $scope.totalQuestions = $scope.myQuestions.length;
    });

		$scope.selectAnswer = function(qIndex, aIndex) {

			var questionState = $scope.myQuestions[qIndex].questionState;

			if ( questionState != 'answered') {
				$scope.myQuestions[qIndex].selectedAnswer = aIndex;
				var correctAnswer = $scope.myQuestions[qIndex].correct;

				$scope.myQuestions[qIndex].correctAnswer = correctAnswer;

				if (aIndex === correctAnswer) {
					$scope.myQuestions[qIndex].correctness = 'correct';
					$scope.score += 1;
				} else {
					$scope.myQuestions[qIndex].correctness = 'incorrect';
				}

				$scope.myQuestions[qIndex].questionState = 'answered';
			}

			$scope.percentage = (($scope.score / $scope.totalQuestions)*100).toFixed(2);

		}

		$scope.isSelected = function(qIndex, aIndex) {
			return $scope.myQuestions[qIndex].selectedAnswer === aIndex;
		};

		$scope.isCorrect = function(qIndex, aIndex) {
			return $scope.myQuestions[qIndex].correctAnswer === aIndex;
		};

		$scope.selectContinue = function() {
			return $scope.activeQuestion += 1;
		}

		$scope.createShareLinks = function(percentage) {

			var url = 'http://aaqibparvez.com';

			var emailLink = '<a href="mailto:?subject=Try to beat my quiz score!&amp;body=I scored '+percentage+'% on this quiz about Saturn. Try to beat my socre at '+url+'" class="btn email" >Email a friend</a>';

			var twitterLink = '<a href="https://twitter.com/home?status=I%20scored%20a%20'+percentage+'%25%20on%20this%20quiz%20about%20Saturn.%20Try%20to%20beat%20my%20score%20at&hashtags=SaturnQuiz%26&url='+ url +'" class="btn twitter" target="_blank">Tweet your score</a>';

			var newMarkup = emailLink + twitterLink;

			return $sce.trustAsHtml(newMarkup);
		}


  }]);

})();
