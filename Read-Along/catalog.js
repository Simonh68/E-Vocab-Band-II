const S=(a,ha,b,hb)=>[[a,ha],[b,hb]];
const extraHe=[
 S('They listened to different opinions,','הם הקשיבו לדעות שונות','before making a decision.','לפני שקיבלו החלטה'),
 S('They considered several choices,','הם שקלו כמה אפשרויות','and discussed the possible results.','ודנו בתוצאות האפשריות'),
 S('Their first plan was not perfect,','התכנית הראשונה שלהם לא הייתה מושלמת','but they did not give up.','אבל הם לא ויתרו'),
 S('They changed their approach,','הם שינו את דרכי הפעולה שלהם','after learning from the experience.','לאחר שלמדו מן הניסיון')
];
const extraSimple=[
 S('They listened to different opinions,','They heard what other people thought','before making a decision.','before they chose what to do'),
 S('They considered several choices,','They thought about different things they could do','and discussed the possible results.','and talked about what might happen'),
 S('Their first plan was not perfect,','Their first idea had some problems','but they did not give up.','but they kept trying'),
 S('They changed their approach,','They tried a different way','after learning from the experience.','after they understood what happened')
];
function expand(core,count,simple){
  if(count===4)return core;
  const x=simple?extraSimple:extraHe;
  if(count===6)return [core[0],core[1],x[0],x[1],core[2],core[3]];
  return [core[0],core[1],x[0],x[1],core[2],x[2],x[3],core[3]];
}
const coverRules=[[2,/injur|recover|accident|hospital|absence/i],[4,/sport|team|coach|match|race|runner|athlet|captain|player|winning/i],[5,/elder|neighbor|shopping|community food|mr\. cohen/i],[6,/plastic|litter|rubbish|waste|clean|river|recycl/i],[7,/garden|plant|soil|water|green|environment|energy/i],[8,/phone|message|image|photograph|account|online|digital/i],[9,/repair|reuse|workshop|café/i],[10,/park|neighborhood|housing|transport|campaign|plan/i],[11,/rain|storm|weather|emergency/i],[3,/wallet|bus stop|money|lost dog|honest/i],[1,/new student|appearance|different|welcome|alone/i]];
function conservativeCover(id,en,desc){const text=`${id} ${en} ${desc}`;const n=(coverRules.find(([,rx])=>rx.test(text))||[Math.abs([...id].reduce((a,c)=>a+c.charCodeAt(0),0))%12])[0];return`scenes/scene-${String(n).padStart(2,'0')}.webp`}
const C=(id,level,group,en,he,descEn,descHe,core)=>({id,level,group,en,he,descEn,descHe,image:conservativeCover(id,en,descEn),simple:group==='ES',scenes:expand(core,level===1?4:level===2?6:8,group==='ES')});

window.STORIES=[
 C('l1-a1-new-student',1,'A1','The New Student','התלמיד החדש','A small invitation changes a difficult first day.','הזמנה קטנה משנה יום ראשון קשה.',[
  S('Noam arrived at a new school,','נועם הגיע לבית ספר חדש','and he did not know anyone.','והוא לא הכיר איש'),
  S('At break time,','בזמן ההפסקה','he sat alone near the library.','הוא ישב לבדו ליד הספרייה'),
  S('Ari invited Noam,','ארי הזמין את נועם','to join a class game.','להצטרף למשחק כיתתי'),
  S('One friendly invitation','הזמנה ידידותית אחת','made Noam feel welcome.','גרמה לנועם להרגיש רצוי')]),
 C('l1-a1-lost-dog',1,'A1','The Lost Dog','הכלב שאבד','Two students balance kindness and responsibility.','שני תלמידים משלבים חסד ואחריות.',[
  S('Leah and Tamar found a dog,','לאה ותמר מצאו כלב','near the school gate.','ליד שער בית הספר'),
  S('The dog looked tired,','הכלב נראה עייף','and its owner was not there.','ובעליו לא היה שם'),
  S('They called an adult for help,','הן קראו למבוגר לעזרה','and arrived at class safely.','והגיעו לכיתה בבטחה'),
  S('Later, the owner thanked them,','לאחר מכן הבעלים הודה להן','for acting responsibly.','על כך שפעלו באחריות')]),
 C('l1-a1-back-to-school',1,'A1','Back to School','חוזרים לבית הספר','A class helps a friend return after an injury.','כיתה עוזרת לחבר לחזור לאחר פציעה.',[
  S('Eli returned to school,','אלי חזר לבית הספר','after many weeks at home.','לאחר שבועות רבים בבית'),
  S('His injured leg was improving,','הרגל הפצועה שלו השתפרה','but the stairs were difficult.','אבל המדרגות היו קשות'),
  S('His classmates shared their notes,','חבריו לכיתה שיתפו את הסיכומים שלהם','and carried his heavy books.','ונשאו את ספריו הכבדים'),
  S('Their steady support','התמיכה הקבועה שלהם','helped Eli return with confidence.','עזרה לאלי לחזור בביטחון')]),
 C('l1-a2-no-phone',1,'A2','A Day Without a Phone','יום בלי טלפון','Friends discover what happens when screens are put away.','חברים מגלים מה קורה כשהמסכים בצד.',[
  S('The class accepted a challenge,','הכיתה קיבלה על עצמה אתגר','to put every phone away.','להכניס את כל הטלפונים'),
  S('At first, the students felt restless,','בהתחלה התלמידים הרגישו חסרי מנוחה','and kept checking their pockets.','והמשיכו לבדוק את הכיסים'),
  S('Soon they began talking,','עד מהרה הם התחילו לשוחח','and invented a new game.','והמציאו משחק חדש'),
  S('By the end of the day,','בסוף היום','they understood the value of attention.','הם הבינו את ערכה של תשומת הלב')]),
 C('l1-a2-last-runner',1,'A2','The Last Runner','הרץ האחרון','A student learns that effort can be a victory.','תלמיד לומד שגם מאמץ יכול להיות ניצחון.',[
  S('Yoni was usually the last runner,','יוני היה בדרך כלל הרץ האחרון','during sports lessons.','בשיעורי הספורט'),
  S('He wanted to stop trying,','הוא רצה להפסיק לנסות','because running was difficult for him.','מפני שהריצה הייתה קשה לו'),
  S('His coach gave him a simple plan,','המאמן נתן לו תכנית פשוטה','and praised every improvement.','ושיבח כל התקדמות'),
  S('Yoni finished the school race,','יוני סיים את מרוץ בית הספר','and felt proud of his effort.','והרגיש גאה במאמץ שלו')]),
 C('l1-a2-clean-playground',1,'A2','The Clean Playground','מגרש המשחקים הנקי','A cleanup teaches practical environmental responsibility.','מבצע ניקיון מלמד אחריות סביבתית מעשית.',[
  S('Plastic bottles covered the playground,','בקבוקי פלסטיק כיסו את המגרש','after a crowded event.','לאחר אירוע עמוס'),
  S('The students worried,','התלמידים דאגו','that the waste could harm animals.','שהפסולת עלולה לפגוע בבעלי חיים'),
  S('They separated paper and plastic,','הם הפרידו נייר ופלסטיק','and placed them in recycling bins.','והניחו אותם בפחי מחזור'),
  S('The clean area reminded everyone,','האזור הנקי הזכיר לכולם','to protect shared spaces.','להגן על שטחים משותפים')]),
 C('l1-es-wrong-message',1,'ES','The Message Sent by Mistake','ההודעה שנשלחה בטעות','An online mistake becomes a lesson in honesty.','טעות מקוונת הופכת לשיעור ביושר.',[
  S('Maya sent a private joke,','Maya sent a joke meant for one friend','to the entire class group.','but everyone in class received it'),
  S('She felt embarrassed,','She felt ashamed and uncomfortable','when she noticed her mistake.','when she saw what she had done'),
  S('Maya apologized immediately,','Maya said she was sorry at once','instead of inventing an excuse.','and did not make a false reason'),
  S('Her honest response','Her truthful answer','helped the class move forward.','helped everyone leave the problem behind')]),
 C('l1-es-appearance',1,'ES','More Than an Appearance','מעבר למראה החיצוני','A project reveals the ability behind an unusual appearance.','פרויקט חושף את היכולת שמעבר למראה שונה.',[
  S('Daniel looked different from most students,','Daniel did not look like most people in class','because of a mark on his face.','because his face had a visible mark'),
  S('Some classmates judged him quickly,','Some students formed an unfair opinion','before they knew him.','before they learned about him'),
  S('During a science project,','While the class worked on science','Daniel solved a difficult problem.','Daniel found the answer to a hard problem'),
  S('The class learned to value character,','The class learned that a person’s actions matter','rather than appearance.','not only the way a person looks')]),
 C('l1-es-school-garden',1,'ES','The Garden Behind the School','הגינה שמאחורי בית הספר','An unused corner becomes a shared garden.','פינה מוזנחת הופכת לגינה משותפת.',[
  S('An empty area behind the school','A place behind the school with nothing in it','was dry and full of stones.','had no water and many stones'),
  S('Students designed a small garden,','Students made a plan for a place with plants','using very little water.','that did not need much water'),
  S('They planted local flowers,','They put flowers from the area into the ground','and protected the soil.','and kept the earth healthy'),
  S('The garden attracted birds,','The new plants brought birds','and gave everyone a quiet place.','and made a calm place for people')]),

 C('l2-a1-wallet',2,'A1','The Wallet at the Bus Stop','הארנק בתחנת האוטובוס','A valuable discovery tests a student’s honesty.','מציאה יקרה מעמידה את היושר במבחן.',[
  S('Rina noticed a wallet,','רינה הבחינה בארנק','under a bench at the bus stop.','מתחת לספסל בתחנת האוטובוס'),
  S('It contained money and documents,','היו בו כסף ומסמכים','but nobody nearby claimed it.','אבל איש בסביבה לא טען שהוא שלו'),
  S('She contacted a responsible adult,','היא פנתה למבוגר אחראי','and used the details to find the owner.','והשתמשה בפרטים כדי למצוא את הבעלים'),
  S('Returning the wallet','השבת הארנק','gave Rina more satisfaction than keeping it.','גרמה לרינה סיפוק רב יותר משמירתו')]),
 C('l2-a1-helping-neighbor',2,'A1','Helping Mr. Cohen','עוזרים למר כהן','Students organize quiet, respectful community help.','תלמידים מארגנים עזרה קהילתית מכבדת.',[
  S('Mr. Cohen lived alone,','מר כהן גר לבדו','on the third floor.','בקומה השלישית'),
  S('Carrying groceries became difficult,','נשיאת הקניות נעשתה קשה','after he hurt his shoulder.','לאחר שפגע בכתפו'),
  S('The students created a weekly schedule,','התלמידים יצרו לוח שבועי','so help would arrive regularly.','כדי שהעזרה תגיע בקביעות'),
  S('Their respectful visits','הביקורים המכובדים שלהם','strengthened the entire neighborhood.','חיזקו את השכונה כולה')]),
 C('l2-a1-team-place',2,'A1','A Place on the Team','מקום בנבחרת','A less athletic student finds a meaningful role.','תלמיד שמתקשה בספורט מוצא תפקיד משמעותי.',[
  S('Amit struggled with speed,','עמית התקשה במהירות','and rarely scored a goal.','ולעיתים רחוקות הבקיע שער'),
  S('He feared that the team','הוא חשש שהנבחרת','had no place for him.','אינה זקוקה לו'),
  S('Amit studied every opponent,','עמית למד כל יריב','and became excellent at planning.','והצטיין בתכנון'),
  S('His careful advice','העצות הזהירות שלו','helped the team win together.','עזרו לנבחרת לנצח יחד')]),
 C('l2-a2-photo-spread',2,'A2','The Photograph That Spread','התמונה שהופצה','A class chooses dignity over online amusement.','כיתה בוחרת בכבוד במקום בשעשוע מקוון.',[
  S('An embarrassing photograph appeared,','תמונה מביכה הופיעה','in several class messages.','בכמה הודעות כיתתיות'),
  S('Some students wanted to forward it,','כמה תלמידים רצו להעביר אותה','because they thought it was funny.','מפני שחשבו שהיא מצחיקה'),
  S('Yael deleted the image,','יעל מחקה את התמונה','and reported what had happened.','ודיווחה על מה שקרה'),
  S('Her decision protected a classmate,','החלטתה הגנה על חבר לכיתה','and stopped the photograph from spreading.','ועצרה את הפצת התמונה')]),
 C('l2-a2-cheating',2,'A2','The Friend Who Cheated','החבר שהעתיק','Loyalty and honesty pull in different directions.','נאמנות ויושר מושכים לכיוונים שונים.',[
  S('During a difficult test,','במהלך מבחן קשה','Omer saw his friend copy an answer.','עומר ראה את חברו מעתיק תשובה'),
  S('He wanted to protect his friend,','הוא רצה להגן על חברו','but he also valued honesty.','אבל גם העריך יושר'),
  S('Omer encouraged him to admit the truth,','עומר עודד אותו להודות באמת','before the teacher asked.','לפני שהמורה שאלה'),
  S('Accepting responsibility','קבלת האחריות','allowed both students to rebuild trust.','אפשרה לשני התלמידים לבנות מחדש אמון')]),
 C('l2-a2-injured-captain',2,'A2','The Injured Captain','הקפטן שנפצע','A team includes its captain during a long recovery.','נבחרת משתפת את הקפטן בתקופת החלמה ארוכה.',[
  S('A cycling accident injured Ben,','תאונת אופניים פצעה את בן','the captain of the school team.','קפטן נבחרת בית הספר'),
  S('He missed school for two months,','הוא נעדר מבית הספר חודשיים','and worried that everyone would forget him.','וחשש שכולם ישכחו אותו'),
  S('His teammates shared practices online,','חבריו לנבחרת שיתפו אימונים ברשת','and asked for his advice.','וביקשו את עצתו'),
  S('Ben returned gradually,','בן חזר בהדרגה','knowing that he still belonged.','בידיעה שהוא עדיין שייך')]),
 C('l2-es-strength',2,'ES','A Different Kind of Strength','סוג אחר של כוח','Calm judgment changes how classmates see a boy.','שיקול דעת רגוע משנה את יחס הכיתה לילד.',[
  S('People often noticed Sam’s unusual appearance,','People often looked first at the way Sam looked','before they noticed his abilities.','before they saw what he could do'),
  S('During a small laboratory accident,','When a minor problem happened in the science room','several students became confused.','some students did not know what to do'),
  S('Sam stayed calm and followed the safety rules,','Sam did not panic and did the safe steps','while others called the teacher.','while other students got the teacher'),
  S('His quiet leadership changed their opinion,','His calm guidance made them think differently','and earned lasting respect.','and made them respect him for a long time')]),
 C('l2-es-food-project',2,'ES','The Community Food Project','מיזם המזון הקהילתי','Students reduce waste while helping families respectfully.','תלמידים מצמצמים פסולת ומסייעים למשפחות בכבוד.',[
  S('The market threw away good food,','The store did not use food that was still safe','at the end of each day.','when the day ended'),
  S('Students saw both waste and need,','Students saw useful food being lost and people needing help','in the same neighborhood.','in one local area'),
  S('They organized safe collection and delivery,','They made a careful plan to take and bring the food','without identifying any family.','without telling people which families needed help'),
  S('The project protected dignity,','The plan respected people’s private lives','and reduced unnecessary waste.','and stopped good food from being thrown away')]),
 C('l2-es-river',2,'ES','The River After the Storm','הנהר לאחר הסערה','Investigation leads to a realistic environmental solution.','חקירה מובילה לפתרון סביבתי מעשי.',[
  S('A powerful storm carried rubbish,','A strong storm moved trash','into the local river.','into the river near the town'),
  S('Students investigated where it came from,','Students tried to find where the trash began','instead of blaming people immediately.','and did not say someone was guilty too quickly'),
  S('They found damaged waste containers,','They found broken places where trash was kept','near a crowded shopping area.','near a place with many stores'),
  S('Their practical proposal','Their idea that could really work','prevented future pollution.','helped stop the river from becoming dirty again')]),

 C('l3-a1-final-place',3,'A1','The Final Place on the Team','המקום האחרון בנבחרת','A coach weighs talent, effort and team responsibility.','מאמן שוקל כישרון, מאמץ ואחריות קבוצתית.',[
  S('Only one place remained,','נותר רק מקום אחד','on the school basketball team.','בנבחרת הכדורסל של בית הספר'),
  S('One player had natural talent,','לשחקן אחד היה כישרון טבעי','while another showed exceptional effort.','ואילו האחר הפגין מאמץ יוצא דופן'),
  S('The coach evaluated teamwork,','המאמן בחן עבודת צוות','discipline and steady improvement.','משמעת והתקדמות קבועה'),
  S('His final decision','החלטתו הסופית','reflected the values of the whole team.','שיקפה את ערכי הנבחרת כולה')]),
 C('l3-a1-park',3,'A1','Saving the Neighborhood Park','מצילים את הפארק השכונתי','Students advocate respectfully for a shared public space.','תלמידים פועלים בכבוד למען שטח ציבורי משותף.',[
  S('The city planned a parking area,','העירייה תכננה חניון','where a neighborhood park stood.','במקום שבו עמד פארק שכונתי'),
  S('Residents needed parking,','התושבים היו זקוקים לחניה','but families also valued the trees.','אבל המשפחות גם העריכו את העצים'),
  S('Students gathered reliable information,','התלמידים אספו מידע אמין','and proposed a balanced alternative.','והציעו חלופה מאוזנת'),
  S('Their respectful campaign','המסע המכבד שלהם','brought both sides into the discussion.','הכניס את שני הצדדים לדיון')]),
 C('l3-a1-empty-seat',3,'A1','The Empty Seat','הכיסא הריק','A class supports a student through a long recovery.','כיתה תומכת בתלמיד לאורך החלמה ממושכת.',[
  S('After a serious accident,','לאחר תאונה קשה','David remained in hospital for weeks.','דוד נשאר בבית החולים במשך שבועות'),
  S('His empty seat reminded the class,','מקומו הריק הזכיר לכיתה','how long he had been absent.','כמה זמן נעדר'),
  S('Students divided notes and visits,','התלמידים חילקו ביניהם סיכומים וביקורים','without overwhelming him.','בלי להכביד עליו'),
  S('Their patient support','התמיכה הסבלנית שלהם','made his eventual return possible.','אפשרה את חזרתו לבסוף')]),
 C('l3-a2-anonymous-account',3,'A2','The Anonymous Account','החשבון האנונימי','Online humor crosses a line and demands responsibility.','הומור מקוון חוצה גבול ודורש אחריות.',[
  S('Students created an anonymous account,','תלמידים יצרו חשבון אנונימי','to share jokes about school life.','כדי לשתף בדיחות על חיי בית הספר'),
  S('The posts became more personal,','הפרסומים נעשו אישיים יותר','and one student stopped attending class.','ותלמיד אחד הפסיק להגיע לכיתה'),
  S('The creators removed the account,','יוצרי החשבון הסירו אותו','and admitted their responsibility.','והודו באחריותם'),
  S('Repairing the harm required','תיקון הפגיעה דרש','more than a quick apology.','יותר מהתנצלות מהירה')]),
 C('l3-a2-volunteer-truth',3,'A2','The Truth About the Volunteer Project','האמת על מיזם ההתנדבות','A competition tests the meaning of service.','תחרות מעמידה במבחן את משמעות הנתינה.',[
  S('A school group entered a competition,','קבוצת בית ספר השתתפה בתחרות','for community service projects.','של מיזמי התנדבות קהילתית'),
  S('Their report exaggerated the hours,','הדו״ח שלהם הגזים במספר השעות','and the number of people helped.','ובמספר האנשים שקיבלו עזרה'),
  S('One member asked the group','אחד מחברי הקבוצה ביקש','to correct the report before judging.','לתקן את הדו״ח לפני השיפוט'),
  S('They lost an advantage,','הם איבדו יתרון','but restored the purpose of their service.','אבל השיבו את מטרת ההתנדבות')]),
 C('l3-a2-repair-cafe',3,'A2','The Repair Café','סדנת התיקונים הקהילתית','Repair connects generations and reduces waste.','תיקון מחבר בין דורות ומצמצם פסולת.',[
  S('Many broken objects','חפצים שבורים רבים','were being thrown away unnecessarily.','נזרקו ללא צורך'),
  S('Teenagers opened a monthly workshop,','בני נוער פתחו סדנה חודשית','with experienced neighborhood volunteers.','עם מתנדבים מנוסים מהשכונה'),
  S('Together they repaired lamps and chairs,','יחד הם תיקנו מנורות וכיסאות','while sharing practical skills.','תוך שיתוף מיומנויות מעשיות'),
  S('Reuse reduced waste,','שימוש חוזר הפחית פסולת','and strengthened community relationships.','וחיזק קשרים קהילתיים')]),
 C('l3-es-promise',3,'ES','The Promise to a Friend','ההבטחה לחבר','A promise becomes complicated when someone may be harmed.','הבטחה מסתבכת כאשר אדם עלול להיפגע.',[
  S('Aaron promised to keep a friend’s secret,','Aaron said he would not tell private information','and took the promise seriously.','and believed his words mattered'),
  S('He later learned that the situation','Later he understood that the problem','might place another student at risk.','could cause harm to someone else'),
  S('Aaron consulted a trusted adult,','Aaron asked a responsible older person for guidance','without spreading unnecessary details.','and did not tell private facts to everyone'),
  S('He learned that loyalty','He learned that being faithful to a friend','must never become permission for harm.','must not allow someone to be hurt')]),
 C('l3-es-winning',3,'ES','The Price of Winning','מחיר הניצחון','A championship forces an athlete to define fair play.','משחק אליפות מאלץ ספורטאי להגדיר משחק הוגן.',[
  S('Before the championship match,','Before the game that would decide the winner','Liam discovered a broken rule.','Liam learned that a rule was not followed'),
  S('Reporting it could weaken the team,','Telling the truth could make the team less likely to win','and disappoint many supporters.','and make many people unhappy'),
  S('He spoke privately with the captain,','He talked with the team leader where others could not hear','and insisted on a fair solution.','and said they must choose an honest answer'),
  S('The team entered the match','The team began the game','with integrity more important than victory.','believing honesty mattered more than winning')]),
 C('l3-es-neighborhood-plan',3,'ES','A Better Plan for the Neighborhood','תכנית טובה יותר לשכונה','Students balance housing, transport and green space.','תלמידים מאזנים בין דיור, תחבורה ושטחים ירוקים.',[
  S('The neighborhood needed more housing,','The local area needed more homes','and better public transportation.','and better buses or trains for everyone'),
  S('The first proposal removed most green space,','The first plan took away almost all parks and plants','to reduce construction costs.','to make building less expensive'),
  S('Students compared evidence and community needs,','Students looked at facts and what local people needed','before presenting a revised plan.','before they showed a changed idea'),
  S('Their design protected trees,','Their plan kept important trees safe','while making room for new residents.','and still created homes for more people')]),

 C('l1-a1-broken-pencil',1,'A1','The Broken Pencil','העיפרון שנשבר','A simple classroom problem becomes an act of kindness.','בעיה פשוטה בכיתה הופכת למעשה של חסד.',[
  S('Nadav’s pencil broke,','העיפרון של נדב נשבר','just before the lesson began.','רגע לפני תחילת השיעור'),
  S('He had no other pencil,','לא היה לו עיפרון אחר','and felt too shy to ask.','והוא התבייש לבקש'),
  S('Sara quietly offered him one,','שרה הציעה לו עיפרון בשקט','without drawing attention.','בלי למשוך תשומת לב'),
  S('Her small act of kindness','מעשה החסד הקטן שלה','helped him join the lesson.','עזר לו להשתתף בשיעור')]),
 C('l1-a1-rainy-walk',1,'A1','The Rainy Walk Home','הדרך הגשומה הביתה','Students choose a safe route during heavy rain.','תלמידים בוחרים דרך בטוחה בגשם כבד.',[
  S('Heavy rain began after school,','גשם כבד החל לאחר הלימודים','and water covered the usual path.','ומים כיסו את הדרך הרגילה'),
  S('The shorter route looked dangerous,','הדרך הקצרה נראתה מסוכנת','near the flooded street.','ליד הרחוב המוצף'),
  S('The students chose a longer route,','התלמידים בחרו בדרך ארוכה יותר','and stayed together.','ונשארו יחד'),
  S('They reached home safely,','הם הגיעו הביתה בבטחה','because they did not rush.','מפני שלא מיהרו')]),
 C('l1-a1-class-plant',1,'A1','The Class Plant','הצמח הכיתתי','Shared care teaches patience and responsibility.','טיפול משותף מלמד סבלנות ואחריות.',[
  S('The class plant became dry,','הצמח הכיתתי התייבש','during a hot week.','במהלך שבוע חם'),
  S('Everyone thought someone else','כולם חשבו שמישהו אחר','would remember to water it.','יזכור להשקות אותו'),
  S('The class made a simple schedule,','הכיתה הכינה לוח פשוט','and measured the water carefully.','ומדדה את המים בזהירות'),
  S('New green leaves appeared,','עלים ירוקים חדשים הופיעו','after several patient days.','לאחר כמה ימים של סבלנות')]),
 C('l1-a2-spare-seat',1,'A2','The Spare Seat','המושב הפנוי','A bus ride offers a chance to notice another person.','נסיעה באוטובוס מזמנת הזדמנות להבחין באחר.',[
  S('The crowded bus had one seat,','באוטובוס העמוס היה מושב אחד','beside Amir.','ליד אמיר'),
  S('An older passenger entered,','נוסע מבוגר עלה','and held a heavy bag.','והחזיק תיק כבד'),
  S('Amir offered his seat,','אמיר הציע את מושבו','and helped with the bag.','ועזר עם התיק'),
  S('The quiet journey','הנסיעה השקטה','became a lesson in awareness.','הפכה לשיעור בתשומת לב')]),
 C('l1-a2-missed-practice',1,'A2','The Missed Practice','האימון שהוחמץ','A teammate chooses support over blame.','חבר לנבחרת בוחר בתמיכה במקום בהאשמה.',[
  S('Lior missed an important practice,','ליאור החמיץ אימון חשוב','because his family needed help.','מפני שמשפחתו נזקקה לעזרה'),
  S('Some teammates became angry,','כמה מחבריו לנבחרת כעסו','before hearing the reason.','לפני ששמעו את הסיבה'),
  S('The captain listened to Lior,','הקפטן הקשיב לליאור','and arranged extra practice.','וארגון אימון נוסף'),
  S('Understanding the situation','הבנת המצב','made the team stronger.','חיזקה את הנבחרת')]),
 C('l1-a2-reusable-bottle',1,'A2','The Reusable Bottle','הבקבוק לשימוש חוזר','One practical idea reduces daily plastic waste.','רעיון מעשי אחד מפחית פסולת פלסטיק יומית.',[
  S('The class used many plastic bottles,','הכיתה השתמשה בבקבוקי פלסטיק רבים','during every school week.','בכל שבוע לימודים'),
  S('Miri counted the empty bottles,','מירי ספרה את הבקבוקים הריקים','and showed the surprising total.','והציגה את המספר המפתיע'),
  S('Students brought reusable bottles,','התלמידים הביאו בקבוקים לשימוש חוזר','and filled them at school.','ומילאו אותם בבית הספר'),
  S('A small daily change','שינוי יומי קטן','greatly reduced their waste.','הפחית מאוד את הפסולת שלהם')]),
 C('l1-es-new-glasses',1,'ES','The New Glasses','המשקפיים החדשים','A student responds wisely to unwanted attention.','תלמיד מגיב בחכמה לתשומת לב לא רצויה.',[
  S('Ethan came to school with new glasses,','Ethan wore glasses at school for the first time','and worried about people looking at him.','and feared that people would stare'),
  S('One student made an unkind comment,','One student said something that was not kind','before the teacher arrived.','before an adult was in the room'),
  S('Ethan answered calmly,','Ethan spoke without anger','and his friend changed the subject.','and his friend moved the talk to something else'),
  S('By lunchtime, the glasses','Before the middle of the day ended, the glasses','were simply part of Ethan.','did not seem unusual anymore')]),
 C('l1-es-school-map',1,'ES','The School Map','מפת בית הספר','Students make the building easier for everyone to navigate.','תלמידים מקלים על כולם להתמצא בבניין.',[
  S('New students often became lost,','Students who had just arrived often did not know where to go','inside the large school building.','inside the big school'),
  S('A group studied the confusing hallways,','A group looked closely at places that were hard to understand','and asked visitors what they needed.','and asked new people what would help'),
  S('They designed a clear map,','They made a simple picture of the building','with colors and easy symbols.','using colors and signs that were easy to know'),
  S('The map helped every visitor,','The picture showed every new person where to go','including those with limited English.','even people who knew only a little English')]),
 C('l1-es-bird-nest',1,'ES','The Nest Near the Window','הקן שליד החלון','Curiosity becomes respectful care for wildlife.','סקרנות הופכת להתחשבות בבעלי חיים.',[
  S('A bird built a nest,','A bird made a small home','beside the classroom window.','next to the window of the class'),
  S('Students wanted a closer look,','Students wanted to see it from very near','but noise frightened the bird.','but loud sounds made the bird afraid'),
  S('They watched from a distance,','They looked while staying far enough away','and kept the area quiet.','and did not make noise there'),
  S('Respecting the nest','Leaving the bird’s home safe','allowed the young birds to grow.','helped the baby birds become bigger')]),

 C('l2-a1-library-book',2,'A1','The Damaged Library Book','ספר הספרייה שניזוק','Honesty matters when an accident causes damage.','יושר חשוב כאשר תאונה גורמת נזק.',[
  S('A drink spilled on Neta’s library book,','משקה נשפך על ספר הספרייה של נטע','and several pages were damaged.','וכמה עמודים ניזוקו'),
  S('She considered returning it quietly,','היא שקלה להחזיר אותו בשקט','without mentioning the accident.','בלי להזכיר את התאונה'),
  S('Neta explained everything to the librarian,','נטע הסבירה הכול לספרנית','and offered to help repair it.','והציעה לעזור לתקן אותו'),
  S('Her honesty solved the problem,','היושר שלה פתר את הבעיה','and preserved the librarian’s trust.','ושמר על אמון הספרנית')]),
 C('l2-a1-lunch-table',2,'A1','The Quiet Lunch Table','שולחן האוכל השקט','Students make room for a peer who is often alone.','תלמידים מפנים מקום לחבר שנמצא לעיתים לבד.',[
  S('Every day, Yosef ate alone,','בכל יום יוסף אכל לבדו','at the end of the lunchroom.','בקצה חדר האוכל'),
  S('Others assumed he preferred silence,','אחרים הניחו שהוא מעדיף שקט','but nobody had asked him.','אבל איש לא שאל אותו'),
  S('Two students invited him gently,','שני תלמידים הזמינו אותו בעדינות','without making him uncomfortable.','בלי לגרום לו אי נוחות'),
  S('The shared table','השולחן המשותף','slowly became a group of friends.','הפך בהדרגה לקבוצת חברים')]),
 C('l2-a1-water-leak',2,'A1','The Hidden Water Leak','דליפת המים הנסתרת','Careful observation prevents needless waste.','התבוננות זהירה מונעת בזבוז מיותר.',[
  S('Students heard water running,','תלמידים שמעו מים זורמים','behind the sports building.','מאחורי בניין הספורט'),
  S('A broken pipe was leaking,','צינור שבור דלף','although nobody could see it easily.','אף שלא היה קל לראות אותו'),
  S('They marked the safe area,','הם סימנו את האזור הבטוח','and informed the school office.','והודיעו למשרד בית הספר'),
  S('The quick repair','התיקון המהיר','saved water and prevented damage.','חסך מים ומנע נזק')]),
 C('l2-a2-group-credit',2,'A2','Who Did the Work?','מי עשה את העבודה?','A group must divide credit fairly.','קבוצה נדרשת לחלק את ההכרה בהגינות.',[
  S('Ruth completed most of the research,','רות השלימה את רוב המחקר','but rarely spoke during presentations.','אבל כמעט שלא דיברה בהצגות'),
  S('The louder students received the praise,','התלמידים הקולניים קיבלו את השבחים','for the successful project.','על הפרויקט המוצלח'),
  S('One group member corrected the record,','אחד מחברי הקבוצה תיקן את הרושם','and described Ruth’s contribution.','ותיאר את תרומתה של רות'),
  S('Fair recognition','הכרה הוגנת','improved their future teamwork.','שיפרה את עבודת הצוות שלהם בעתיד')]),
 C('l2-a2-rumor',2,'A2','The Unverified Rumor','השמועה שלא נבדקה','A student refuses to spread an uncertain story.','תלמיד מסרב להפיץ סיפור שלא נבדק.',[
  S('A surprising rumor spread,','שמועה מפתיעה התפשטה','about a popular teacher.','על מורה אהוד'),
  S('Nobody knew its source,','איש לא ידע את מקורה','but many students repeated it.','אבל תלמידים רבים חזרו עליה'),
  S('Hila asked for reliable evidence,','הילה ביקשה ראיות אמינות','and stopped forwarding the messages.','והפסיקה להעביר את ההודעות'),
  S('The rumor disappeared,','השמועה נעלמה','before it caused lasting harm.','לפני שגרמה נזק מתמשך')]),
 C('l2-a2-community-race',2,'A2','The Community Race','המרוץ הקהילתי','Students redesign a sports event so more people can join.','תלמידים מתכננים מחדש אירוע ספורט כדי לאפשר השתתפות רחבה.',[
  S('The school planned a charity race,','בית הספר תכנן מרוץ התרמה','with only one difficult route.','עם מסלול קשה אחד בלבד'),
  S('Several students could not participate,','כמה תלמידים לא יכלו להשתתף','because of physical limitations.','בשל מגבלות גופניות'),
  S('The organizers added shorter routes,','המארגנים הוסיפו מסלולים קצרים יותר','and non-running roles.','ותפקידים שאינם כוללים ריצה'),
  S('The inclusive event','האירוע המשלב','raised more support than expected.','גייס תמיכה רבה מהצפוי')]),
 C('l2-es-online-challenge',2,'ES','The Risky Online Challenge','האתגר המקוון המסוכן','A teen chooses judgment over online pressure.','נער בוחר בשיקול דעת מול לחץ מקוון.',[
  S('A risky challenge became popular online,','A dangerous activity became common on the internet','among students at school.','with many students in the school'),
  S('Friends pressured Adam to record it,','Friends pushed Adam to make a video of himself doing it','and promised he would become popular.','and said many people would like him'),
  S('Adam refused and explained the danger,','Adam said no and told them how someone could get hurt','without insulting his friends.','but did not speak badly to his friends'),
  S('His decision encouraged others','His choice helped other people feel able','to refuse the challenge too.','to say no to the activity as well')]),
 C('l2-es-accessible-trip',2,'ES','A Trip for Everyone','טיול לכולם','A class adapts a hike without lowering its value.','כיתה מתאימה טיול בלי להפחית מערכו.',[
  S('The class chose a mountain trail,','The class selected a walking path on a mountain','for its annual trip.','for the trip it took every year'),
  S('Part of the route was inaccessible,','One part could not be used by every person','to a student with limited mobility.','by a student who found movement difficult'),
  S('Students researched another route,','Students looked for a different path','with the same natural features.','that still had the same nature and views'),
  S('The adapted trip challenged everyone,','The changed trip was still difficult and interesting for all','and excluded nobody.','and no person was left out')]),
 C('l2-es-energy-audit',2,'ES','The School Energy Audit','בדיקת האנרגיה בבית הספר','Students turn measurements into practical savings.','תלמידים הופכים מדידות לחיסכון מעשי.',[
  S('Lights and air conditioners remained on,','Lights and machines that cooled the air kept working','in many empty classrooms.','in rooms with no people'),
  S('Students measured the wasted electricity,','Students found how much power was used for no reason','over an entire week.','during seven days'),
  S('They proposed timers and clear routines,','They suggested machines that turn things off and simple rules','rather than blaming individuals.','instead of saying certain people were at fault'),
  S('The school reduced energy use,','The school used less power','without reducing comfort.','but people were still comfortable')]),

 C('l3-a1-first-aid',3,'A1','The First Aid Lesson','שיעור העזרה הראשונה','Training becomes useful during a real emergency.','הכשרה הופכת למועילה בשעת חירום אמיתית.',[
  S('During a community event,','במהלך אירוע קהילתי','a visitor suddenly fell.','מבקר נפל לפתע'),
  S('Several people gathered around,','כמה אנשים התאספו סביבו','but nobody knew what to do.','אבל איש לא ידע מה לעשות'),
  S('Shira used her first aid training,','שירה השתמשה בהכשרת העזרה הראשונה שלה','and directed someone to call for help.','והנחתה מישהו להזעיק עזרה'),
  S('Her calm response','תגובתה הרגועה','kept the situation safe until help arrived.','שמרה על המצב בטוח עד שהעזרה הגיעה')]),
 C('l3-a1-community-library',3,'A1','The Small Community Library','הספרייה הקהילתית הקטנה','Service and planning protect a valued institution.','שירות ותכנון מגינים על מוסד חשוב.',[
  S('The local library faced closure,','הספרייה המקומית עמדה בפני סגירה','because too few people used it.','מפני שמעט מדי אנשים השתמשו בה'),
  S('Students valued its quiet space,','התלמידים העריכו את המקום השקט שלה','and its free resources.','ואת המשאבים החינמיים שלה'),
  S('They organized reading support,','הם ארגנו תמיכה בקריאה','and useful community events.','ואירועים קהילתיים מועילים'),
  S('Growing participation','ההשתתפות הגוברת','gave the library a sustainable future.','העניקה לספרייה עתיד יציב')]),
 C('l3-a1-water-shortage',3,'A1','Every Drop Matters','כל טיפה חשובה','Students create a fair response to water shortage.','תלמידים יוצרים מענה הוגן למחסור במים.',[
  S('A dry winter reduced local water supplies,','חורף יבש הפחית את מאגרי המים המקומיים','and restrictions became necessary.','והגבלות נעשו הכרחיות'),
  S('Some proposed closing every garden,','אחדים הציעו לסגור כל גינה','while others rejected all limits.','ואחרים דחו כל הגבלה'),
  S('Students studied actual water use,','התלמידים בחנו את צריכת המים בפועל','and suggested fair priorities.','והציעו סדרי עדיפויות הוגנים'),
  S('Their balanced plan','התכנית המאוזנת שלהם','protected essential needs and public spaces.','הגנה על צרכים חיוניים ועל שטחים ציבוריים')]),
 C('l3-a2-ai-homework',3,'A2','The Perfect Homework','שיעורי הבית המושלמים','New technology raises an old question about honesty.','טכנולוגיה חדשה מעלה שאלה ישנה על יושר.',[
  S('A digital tool produced an excellent essay,','כלי דיגיטלי יצר חיבור מצוין','within a few seconds.','בתוך שניות אחדות'),
  S('Erez submitted most of it unchanged,','ארז הגיש את רובו בלי שינוי','and received the highest grade.','וקיבל את הציון הגבוה ביותר'),
  S('He realized that the work','הוא הבין שהעבודה','did not show his own learning.','לא הציגה את הלמידה שלו עצמו'),
  S('Erez explained what happened,','ארז הסביר מה קרה','and completed a new assignment honestly.','והשלים מטלה חדשה ביושר')]),
 C('l3-a2-witness',3,'A2','The Silent Witness','העד השקט','A bystander decides whether silence is neutral.','עד מן הצד מחליט אם שתיקה היא עמדה ניטרלית.',[
  S('Tal witnessed repeated humiliation,','טל היה עד להשפלה חוזרת','of a quiet student after practice.','של תלמיד שקט לאחר האימון'),
  S('The students involved were his friends,','התלמידים המעורבים היו חבריו','and warned him to stay silent.','והזהירו אותו לשתוק'),
  S('Tal recorded the facts carefully,','טל תיעד את העובדות בזהירות','and reported them to a responsible adult.','ודיווח עליהן למבוגר אחראי'),
  S('Speaking truthfully','הדיבור האמיתי','ended the harm and began a fair process.','הפסיק את הפגיעה והתחיל הליך הוגן')]),
 C('l3-a2-food-waste',3,'A2','The Cafeteria Plan','התכנית לחדר האוכל','Students reduce food waste without embarrassing anyone.','תלמידים מצמצמים בזבוז מזון בלי להביך איש.',[
  S('Large amounts of food remained,','כמויות גדולות של מזון נשארו','after lunch every day.','לאחר ארוחת הצהריים בכל יום'),
  S('A careless solution could embarrass students,','פתרון לא זהיר עלול היה להביך תלמידים','or create health risks.','או ליצור סיכונים בריאותיים'),
  S('The committee adjusted portions,','הוועדה התאימה את גודל המנות','and arranged safe donation.','וארגנה תרומה בטוחה'),
  S('The respectful plan','התכנית המכבדת','reduced waste while protecting dignity.','הפחיתה פסולת תוך שמירה על כבוד')]),
 C('l3-es-captain-choice',3,'ES','The Captain’s Decision','החלטת הקפטן','Leadership is tested when the best player breaks team rules.','מנהיגות עומדת למבחן כשהשחקן הטוב ביותר מפר כללים.',[
  S('The team’s strongest player','The person with the greatest skill on the team','repeatedly disrespected team rules.','continued to act against the team’s rules'),
  S('Benching him could cost the championship,','Not allowing him to play could make the team lose the final game','and anger many supporters.','and make many people who supported them angry'),
  S('The captain applied the same standard,','The team leader used the same rule','that every other player followed.','that was used for all the other players'),
  S('The difficult decision','The choice that was hard to make','protected the team’s long-term character.','kept the team honest and responsible for the future')]),
 C('l3-es-private-donation',3,'ES','The Quiet Donation','התרומה השקטה','Helping well requires protecting the receiver’s dignity.','עזרה נכונה דורשת הגנה על כבודו של המקבל.',[
  S('Students learned that a family needed help,','Students found out that a family did not have enough','after an unexpected crisis.','after a serious problem they did not plan for'),
  S('Public fundraising might reveal private details,','Collecting money where everyone could see might share personal facts','and cause embarrassment.','and make the family feel ashamed'),
  S('They worked through a trusted organization,','They used a responsible group to give the help','and protected every name.','and kept all people’s names private'),
  S('The quiet donation','The help that was given without public attention','met the need without harming dignity.','gave what was needed and still respected the family')]),
 C('l3-es-clean-transport',3,'ES','The Clean Transport Debate','הדיון בתחבורה נקייה','Students weigh access, safety, cost and pollution.','תלמידים שוקלים נגישות, בטיחות, עלות וזיהום.',[
  S('Traffic near school was unsafe,','The many cars near school created danger','and produced heavy pollution.','and made the air dirty'),
  S('A car ban sounded simple,','A rule stopping all cars seemed easy','but some families depended on vehicles.','but some families truly needed to use a car'),
  S('Students compared buses, bicycles and shared rides,','Students studied travel by bus, bicycle and cars used by several people','with cost and access in mind.','while thinking about price and who could use each choice'),
  S('Their flexible proposal','Their plan with more than one choice','improved safety without ignoring real needs.','made travel safer and still cared about people’s true needs')])
];

window.LEVELS={
  1:{en:'Grades 7–8',he:'כיתות ז׳–ח׳',noteEn:'Short stories · clear sentences',noteHe:'סיפורים קצרים · משפטים ברורים'},
  2:{en:'Grades 8–9',he:'כיתות ח׳–ט׳',noteEn:'Longer stories · social choices',noteHe:'סיפורים ארוכים יותר · בחירות חברתיות'},
  3:{en:'Grades 9–10',he:'כיתות ט׳–י׳',noteEn:'Extended stories · moral questions',noteHe:'סיפורים מורחבים · שאלות מוסריות'}
};
window.GROUPS={A1:{en:'Group A1',he:'הקבצה א׳1',note:'Supported'},A2:{en:'Group A2',he:'הקבצה א׳2',note:'Independent'},ES:{en:'English Speakers',he:'דוברי אנגלית',note:'Advanced + simple English help'}};
