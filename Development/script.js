$(document).ready(function () {
    // Displays the current date at the top of the calendar
    function displayCurrentDate() {
        var currentDate = dayjs().format("dddd, MMMM D");
        $("#currentDay").text(currentDate);
    }

    // Define the time frame  (9AM - 5PM)
    var businessHoursStart = 9;
    var businessHoursEnd = 17;

    // Updates time block styles based on the current time
    function updateHourBlocks() {
        var currentHour = dayjs().hour();

        $(".time-block").each(function () {
            var blockHour = parseInt($(this).attr("id").split("-")[1]);

            if (blockHour < currentHour) {
                $(this).addClass("past").removeClass("present future");
            } else if (blockHour === currentHour) {
                $(this).addClass("present").removeClass("past future");
            } else {
                $(this).addClass("future").removeClass("past present");
            }
        });
    }

    // Loads events from local storage
    function loadEvents() {
        $(".time-block").each(function () {
            var blockId = $(this).attr("id");
            var savedEvent = localStorage.getItem(blockId);

            if (savedEvent) {
                $(this).find(".description").val(savedEvent);
            }
        });
    }

    // Saves events to local storage
    $(".saveBtn").on("click", function () {
        var blockId = $(this).closest(".time-block").attr("id");
        var eventText = $(this).siblings(".description").val();

        localStorage.setItem(blockId, eventText);
    });

    // Displays the current date, update time block styles, and load events
    displayCurrentDate();
    updateHourBlocks();
    loadEvents();

    // Set an interval to update time block styles every hour
    setInterval(function () {
        updateHourBlocks();
    }, 60000);
});
