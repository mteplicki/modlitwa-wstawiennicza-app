import DialogFallback from "../root/DialogFallback";

function getDate() {
    let date1 = new Date();
    let day1 = date1.getDate();
    let month1 = date1.getMonth() + 1;
    let year1 = date1.getFullYear();

    let date2 = new Date()
    date2.setDate(date2.getDate() - 7);
    let day2 = date2.getDate();
    let month2 = date2.getMonth() + 1;
    let year2 = date2.getFullYear();

    return [`${year2}-${month2}-${day2}`, `${year1}-${month1}-${day1}`]
}


export default function HeaderFallback() {
    return <div>
        <div class="absolute w-full h-full">
            <DialogFallback notMinHeight/>
        </div>
        <h2 class="text-2xl opacity-0 sm:text-3xl font-extrabold dark:text-white px-4 text-center">Oto Twoje intencje na następujący tydzień: <br /> <span class="text-tertiary">{getDate()[0]} {getDate()[1]}</span></h2>
    </div>
}