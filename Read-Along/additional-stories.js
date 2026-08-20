(function(){
const A=(en,help)=>[[en,help]];
const targets={
 '1-A1':[8,9,10,11,12,13],'1-A2':[9,10,11,12,13,14],'1-ES':[11,12,14,15,16,17],
 '2-A1':[10,11,13,14,15,16],'2-A2':[11,12,14,15,16,17],'2-ES':[13,14,16,17,19,20],
 '3-A1':[12,13,15,16,17,18],'3-A2':[13,14,16,17,19,20],'3-ES':[15,17,18,20,21,23]
};
const data={
'1-A1':[
['helmet-handlebar','Helmet on the Handlebar','הקסדה שעל הכידון','Dan left his helmet on the handlebar.','דן השאיר את הקסדה על הכידון.','He rode only a short distance.','הוא רכב מרחק קצר בלבד.','A sudden stop made him lose balance.','עצירה פתאומית גרמה לו לאבד שיווי משקל.','Dan understood that a helmet works only when it is worn.','דן הבין שקסדה מגינה רק כאשר חובשים אותה.'],
['wrong-classroom','The Wrong Classroom','הכיתה הלא נכונה','Nadav entered the wrong classroom.','נדב נכנס לכיתה הלא נכונה.','He felt embarrassed and wanted to leave quietly.','הוא חש מבוכה ורצה לצאת בשקט.','A student checked his schedule and showed him the way.','תלמיד בדק את המערכת שלו והראה לו את הדרך.','Asking for help saved time and reduced his worry.','בקשת עזרה חסכה זמן והפחיתה את דאגתו.'],
['missing-notebook','The Missing Notebook','המחברת החסרה','Maya could not find her English notebook.','מאיה לא מצאה את מחברת האנגלית שלה.','She searched her bag and desk carefully.','היא חיפשה בתיק ובשולחן בזהירות.','A classmate remembered seeing it in the library.','חברה זכרה שראתה אותה בספרייה.','Maya found it and began labeling her school materials.','מאיה מצאה אותה והחלה לסמן את ציוד הלימוד שלה.'],
['safe-bicycle-ride','The Safe Bicycle Ride','הרכיבה הבטוחה','Ari checked his bicycle before leaving.','ארי בדק את אופניו לפני שיצא.','He wore a helmet and tested the brakes.','הוא חבש קסדה ובדק את הבלמים.','He used the bicycle path and stopped at the crossing.','הוא השתמש בשביל האופניים ועצר במעבר.','Careful habits helped him arrive safely.','הרגלים זהירים עזרו לו להגיע בבטחה.'],
['class-pet','The Class Pet','חיית המחמד הכיתתית','The class wanted to care for a small animal.','הכיתה רצתה לטפל בחיה קטנה.','They learned what food and space it needed.','הם למדו איזה מזון ומרחב היא צריכה.','Students shared the daily jobs fairly.','התלמידים חילקו את המשימות היומיות בהגינות.','The animal stayed healthy because the class acted responsibly.','החיה נשארה בריאה מפני שהכיתה פעלה באחריות.'],
['one-more-video','One More Video','עוד סרטון אחד','Lior planned to watch one short video.','ליאור תכנן לצפות בסרטון קצר אחד.','The next video started automatically.','הסרטון הבא התחיל באופן אוטומטי.','He noticed that an hour had passed.','הוא הבחין שעברה שעה.','Lior turned off autoplay and returned to his homework.','ליאור כיבה את ההפעלה האוטומטית וחזר לשיעורי הבית.']],
'1-A2':[
['one-scooter-two-friends','One Scooter, Two Friends','קורקינט אחד, שני חברים','Two friends tried to ride one electric scooter.','שני חברים ניסו לרכוב על קורקינט חשמלי אחד.','Only one of them had a helmet.','רק לאחד מהם הייתה קסדה.','A police officer explained the danger and the possible fine.','שוטר הסביר את הסכנה ואת הקנס האפשרי.','They walked home and agreed to ride separately next time.','הם הלכו הביתה והסכימו לרכוב בנפרד בפעם הבאה.'],
['unequal-group','The Unequal Group','הקבוצה הלא שוויונית','One student completed nearly every part of the project.','תלמיד אחד השלים כמעט כל חלק בפרויקט.','The others expected to receive the same credit.','האחרים ציפו לקבל אותה הכרה.','The group listed each task and divided the remaining work.','הקבוצה רשמה כל משימה וחילקה את העבודה שנותרה.','Clear responsibility made the final result fairer.','אחריות ברורה הפכה את התוצאה הסופית להוגנת יותר.'],
['new-bus-route','The New Bus Route','קו האוטובוס החדש','A new bus route changed the students’ journey.','קו אוטובוס חדש שינה את נסיעת התלמידים.','The route was faster but skipped an important stop.','המסלול היה מהיר יותר אך דילג על תחנה חשובה.','Students collected travel times and passenger needs.','התלמידים אספו זמני נסיעה וצרכי נוסעים.','Their evidence supported a useful change to the route.','הנתונים שלהם תמכו בשינוי מועיל במסלול.'],
['unfair-team-choice','The Unfair Team Choice','בחירת הקבוצה הלא הוגנת','Two captains repeatedly chose only their close friends.','שני קפטנים בחרו שוב ושוב רק בחבריהם הקרובים.','Several students were always left until the end.','כמה תלמידים תמיד נשארו לסוף.','The class created rotating, balanced teams.','הכיתה יצרה קבוצות מאוזנות ומתחלפות.','Participation improved when everyone received a real role.','ההשתתפות השתפרה כאשר כל אחד קיבל תפקיד אמיתי.'],
['screen-time-plan','The Screen-Time Plan','התכנית לזמן מסך','Dana’s screen time replaced sleep and exercise.','זמן המסך של דנה בא על חשבון שינה ופעילות גופנית.','She recorded her daily use for one week.','היא תיעדה את השימוש היומי שלה במשך שבוע.','Dana set limits and planned outdoor activity.','דנה קבעה גבולות ותכננה פעילות בחוץ.','The balanced routine improved her energy and concentration.','השגרה המאוזנת שיפרה את האנרגיה והריכוז שלה.'],
['water-bottle-station','The Water Bottle Station','תחנת מילוי הבקבוקים','The school threw away hundreds of plastic bottles.','בית הספר השליך מאות בקבוקי פלסטיק.','Students measured the waste instead of guessing.','התלמידים מדדו את הפסולת במקום לנחש.','They proposed a refill station and reusable bottles.','הם הציעו תחנת מילוי ובקבוקים לשימוש חוזר.','The simple system reduced waste every day.','המערכת הפשוטה הפחיתה פסולת בכל יום.']],
'1-ES':[
['ride-changed-plans','The Ride That Changed His Plans','הרכיבה ששינתה את תכניותיו','Eitan offered his friend a ride on an electric scooter.','Eitan invited a friend to share his electric scooter.','Neither student had a second helmet.','There was no safe helmet for the passenger.','After a near collision, they learned about injury, fines, and license restrictions.','A close call taught them about harm and legal consequences.','They chose safer transport and warned their friends.','They changed their travel plan and shared the lesson.'],
['misleading-headline','The Misleading Headline','הכותרת המטעה','A dramatic headline spread through the class group.','A shocking title was shared by many students.','The article itself made a much narrower claim.','The full report said far less than its title suggested.','Students compared the source, date, and supporting evidence.','They checked who published it, when, and why.','They corrected the message before the rumor grew.','They shared accurate information before more harm was done.'],
['uncredited-idea','The Uncredited Idea','הרעיון שלא זכה להכרה','A successful project used an idea from a quiet student.','The main plan came from a student who rarely spoke.','The presentation did not mention her contribution.','Her work was missing from the public credit.','One teammate corrected the record and showed the planning notes.','A group member used evidence to identify the true source.','Proper credit restored trust within the group.','Fair recognition repaired the working relationship.'],
['edited-photograph','The Edited Photograph','התצלום הערוך','An edited photograph appeared to prove a surprising event.','A changed image seemed to show something shocking.','Small visual details did not match the original setting.','Several parts of the picture were inconsistent.','Students found the original and traced the changes.','They located the first image and compared every alteration.','The comparison showed why images also require verification.','They learned that pictures must be checked like written claims.'],
['feed-never-ended','The Feed That Never Ended','הפיד שלא נגמר','Roni opened a social-media feed during a short break.','Roni planned to look online for only a few minutes.','The endless stream kept replacing one item with another.','New posts continually appeared without a natural stopping point.','She used a timer and moved the phone beyond reach.','She created a clear limit and removed the immediate temptation.','Her attention returned when the platform stopped choosing for her.','She regained control of how she used her time.'],
['cost-of-convenience','The Cost of Convenience','מחיר הנוחות','Disposable supplies made the school event easy to organize.','Single-use products saved time during the event.','They also produced bags of unnecessary waste.','The convenient choice created a large environmental cost.','Students compared price, labor, and long-term impact.','They examined the full cost, not only the purchase price.','Reusable equipment required planning but reduced future waste.','A less convenient system produced a better lasting result.']],
'2-A1':[
['homework-could-not-explain','The Homework He Could Not Explain','שיעורי הבית שלא ידע להסביר','Yossi used an AI tool to complete his homework.','יוסי השתמש בכלי בינה מלאכותית כדי להשלים את שיעורי הבית.','He submitted answers that he did not understand.','הוא הגיש תשובות שלא הבין.','When the teacher asked questions, he could not explain the material.','כאשר המורה שאלה שאלות, הוא לא הצליח להסביר את החומר.','Yossi redid the task and used the tool only for feedback.','יוסי ביצע את המטלה מחדש והשתמש בכלי רק לקבלת משוב.'],
['hospital-visit','The Hospital Visit','הביקור בבית החולים','A classmate stayed in hospital after an operation.','חבר לכיתה נשאר בבית החולים לאחר ניתוח.','The class wanted to support him without tiring him.','הכיתה רצתה לתמוך בו בלי לעייף אותו.','They sent a short card and arranged one quiet visit.','הם שלחו כרטיס קצר וארגנו ביקור שקט אחד.','Their thoughtful plan showed care and respect.','התכנית המתחשבת שלהם ביטאה אכפתיות וכבוד.'],
['emergency-practice','The Emergency Practice','תרגול החירום','The alarm sounded during a regular lesson.','האזעקה נשמעה במהלך שיעור רגיל.','Some students wanted to run into the hallway.','כמה תלמידים רצו לרוץ למסדרון.','The class followed the practiced route calmly.','הכיתה פעלה בשקט לפי המסלול שתורגל.','Preparation helped everyone reach the safe area.','ההכנה עזרה לכולם להגיע לאזור הבטוח.'],
['weekend-volunteer','The Weekend Volunteer','המתנדב בסוף השבוע','Amir volunteered at a community food center.','אמיר התנדב במרכז מזון קהילתי.','At first, he expected only to carry boxes.','בהתחלה הוא ציפה רק לשאת ארגזים.','He learned to organize orders and speak respectfully with visitors.','הוא למד לארגן הזמנות ולשוחח בכבוד עם המבקרים.','The work changed his understanding of useful service.','העבודה שינתה את הבנתו לגבי שירות מועיל.'],
['missed-practice-screen','The Practice He Missed','האימון שהחמיץ','Gil stayed online late into the night.','גיל נשאר ברשת עד שעה מאוחרת בלילה.','He overslept and missed an important practice.','הוא ישן מאוחר והחמיץ אימון חשוב.','Gil apologized and changed his evening routine.','גיל התנצל ושינה את שגרת הערב שלו.','Better balance helped him keep his commitment.','איזון טוב יותר עזר לו לעמוד בהתחייבותו.'],
['shared-computer','The Shared Computer','המחשב המשותף','Several students needed the same school computer.','כמה תלמידים נזקקו לאותו מחשב בית-ספרי.','One student kept it for an unimportant game.','תלמיד אחד החזיק בו לצורך משחק לא חשוב.','They created time slots based on urgent needs.','הם יצרו חלונות זמן לפי הצרכים הדחופים.','A clear rule made the limited resource fair.','כלל ברור הפך את המשאב המוגבל להוגן.']],
'2-A2':[
['perfect-project','The Perfect Project','הפרויקט המושלם','An AI tool produced a polished project overnight.','כלי בינה מלאכותית יצר פרויקט מלוטש בן לילה.','The group had not checked several important claims.','הקבוצה לא בדקה כמה טענות חשובות.','They verified the sources and rewrote the work in their own words.','הם אימתו את המקורות וכתבו מחדש במילים שלהם.','The less perfect version showed genuine learning.','הגרסה הפחות מושלמת הציגה למידה אמיתית.'],
['missing-permission','The Missing Permission','האישור החסר','Students published a video from a school event.','תלמידים פרסמו סרטון מאירוע בית-ספרי.','One person in the background had not agreed to appear.','אדם אחד ברקע לא הסכים להופיע.','They removed the video and requested clear permission.','הם הסירו את הסרטון וביקשו אישור ברור.','Respecting consent became part of every later project.','כיבוד הסכמה הפך לחלק מכל פרויקט מאוחר יותר.'],
['false-emergency-message','The False Emergency Message','הודעת החירום הכוזבת','A warning message claimed that the school would close.','הודעת אזהרה טענה שבית הספר ייסגר.','The message had no official source or date.','להודעה לא היו מקור רשמי או תאריך.','Students checked the school notice before forwarding it.','התלמידים בדקו את הודעת בית הספר לפני שהעבירו אותה.','Verification prevented unnecessary fear.','האימות מנע פחד מיותר.'],
['accessible-sports-day','The Accessible Sports Day','יום הספורט הנגיש','The original sports day excluded several students.','יום הספורט המקורי הדיר כמה תלמידים.','The organizers consulted them before changing the events.','המארגנים התייעצו איתם לפני ששינו את הפעילויות.','They added flexible routes, roles, and scoring.','הם הוסיפו מסלולים, תפקידים וניקוד גמישים.','The new design increased challenge and participation.','התכנון החדש הגדיל את האתגר ואת ההשתתפות.'],
['community-survey','The Community Survey','הסקר הקהילתי','A small survey seemed to represent the whole neighborhood.','סקר קטן נראה כמייצג את כל השכונה.','Most answers had come from one street.','רוב התשובות הגיעו מרחוב אחד.','Students expanded the sample and revised the questions.','התלמידים הרחיבו את המדגם ושינו את השאלות.','Better methods produced more reliable conclusions.','שיטות טובות יותר יצרו מסקנות אמינות יותר.'],
['sitting-all-afternoon','Sitting All Afternoon','יושבים כל אחר הצהריים','Homework and social media kept Yael seated for hours.','שיעורי בית ורשתות חברתיות השאירו את יעל יושבת שעות.','She noticed lower energy and weaker concentration.','היא הבחינה באנרגיה נמוכה ובריכוז חלש יותר.','Yael added movement breaks and phone-free study periods.','יעל הוסיפה הפסקות תנועה וזמני למידה ללא טלפון.','The new balance improved both study and health.','האיזון החדש שיפר גם את הלמידה וגם את הבריאות.']],
'2-ES':[
['answer-behind-answer','The Answer Behind the Answer','התשובה שמאחורי התשובה','An AI system supplied a confident answer.','A digital system produced an answer that sounded certain.','Its sources did not actually support the conclusion.','The evidence behind it was weak or unrelated.','Students reconstructed the reasoning and identified the gap.','They examined each step and found what was missing.','Understanding the process mattered more than copying the result.','Real learning required explaining how the answer was reached.'],
['selective-report','The Selective Report','הדוח הסלקטיבי','A report celebrated improvement while omitting several failures.','A positive report left out results that did not fit its message.','The missing data changed the meaning of the conclusion.','The complete evidence suggested a different judgment.','Students restored the full set and explained its limitations.','They added the excluded facts and stated what remained uncertain.','A transparent report proved more useful than a flattering one.','Honest limits made the information more trustworthy.'],
['algorithm-recommendation','The Algorithm’s Recommendation','המלצת האלגוריתם','A school platform repeatedly recommended the same kind of material.','A digital system kept offering similar content.','Past clicks had narrowed what each student could discover.','Earlier choices quietly limited later options.','Students deliberately explored sources outside the recommendations.','They searched beyond what the system placed first.','Broader choices reduced the influence of an invisible pattern.','Active selection created a more balanced view.'],
['confidential-conversation','The Confidential Conversation','השיחה החסויה','A private conversation revealed that a student needed help.','Someone shared a serious problem in confidence.','Keeping every detail secret could leave the student unsafe.','Complete silence might prevent necessary support.','A trusted adult received only the information required to act.','The student shared limited facts with the right responsible person.','Responsible confidentiality protected both privacy and safety.','Careful disclosure respected the person while addressing the risk.'],
['late-evidence','The Evidence That Arrived Late','הראיה שהגיעה באיחור','A committee had nearly completed its decision.','A group was close to making a final choice.','New evidence arrived after members had defended strong positions.','Important facts appeared only after opinions had hardened.','They reopened the discussion and tested the evidence fairly.','They reviewed the new material instead of protecting pride.','Changing the decision demonstrated strength rather than weakness.','Revision showed respect for truth, not uncertainty of character.'],
['designed-attention','Designed to Hold Attention','מתוכנן להחזיק את הקשב','A platform measured exactly when users were likely to leave.','A service studied the moment people might stop watching.','It then supplied alerts and rewards that delayed that choice.','It used prompts to keep users engaged longer.','Students disabled the prompts and planned a stopping point in advance.','They removed the triggers and chose their limit before opening the app.','Control improved when intention replaced automatic reaction.','They used the platform deliberately instead of being directed by it.']],
'3-A1':[
['first-job-interview','The First Job Interview','ראיון העבודה הראשון','Noa prepared for her first job interview.','נועה התכוננה לראיון העבודה הראשון שלה.','She studied the role and practiced direct answers.','היא למדה על התפקיד ותרגלה תשובות ישירות.','During the interview, she admitted what she still needed to learn.','במהלך הראיון היא הודתה מה עדיין עליה ללמוד.','Her honest preparation created a strong impression.','ההכנה הכנה שלה יצרה רושם חזק.'],
['shift-exchange','The Shift Exchange','החלפת המשמרת','A worker needed to exchange a weekend shift.','עובד נזקק להחליף משמרת בסוף השבוע.','A quick private agreement left the manager uninformed.','הסכמה פרטית מהירה השאירה את המנהל ללא מידע.','The students followed the workplace procedure and confirmed the change.','התלמידים פעלו לפי נוהל מקום העבודה ואישרו את השינוי.','Clear communication prevented an empty shift.','תקשורת ברורה מנעה משמרת ללא עובד.'],
['safety-rule','The Safety Rule','כלל הבטיחות','A familiar safety rule seemed unnecessary.','כלל בטיחות מוכר נראה מיותר.','Workers had followed it for months without an accident.','העובדים פעלו לפיו חודשים בלי תאונה.','A supervisor explained the serious risk it controlled.','מפקח הסביר את הסיכון החמור שהוא מונע.','The team understood that prevention often looks invisible.','הצוות הבין שמניעה נראית לעיתים בלתי מורגשת.'],
['week-without-movement','A Week Without Movement','שבוע ללא תנועה','Exam preparation kept Ron seated for most of the week.','הכנה לבחינות השאירה את רון יושב רוב השבוע.','Long screen sessions reduced his sleep and energy.','זמני מסך ארוכים הפחיתו את השינה והאנרגיה שלו.','He scheduled short walks between focused study periods.','הוא תכנן הליכות קצרות בין זמני למידה ממוקדים.','Movement improved his concentration without reducing study time.','התנועה שיפרה את ריכוזו בלי להפחית את זמן הלמידה.'],
['emergency-team','The Neighborhood Emergency Team','צוות החירום השכונתי','Residents created a local emergency team.','תושבים הקימו צוות חירום מקומי.','They mapped skills, equipment, and people who might need help.','הם מיפו מיומנויות, ציוד ואנשים שעשויים להזדקק לעזרה.','Students practiced communication and simple support roles.','תלמידים תרגלו תקשורת ותפקידי סיוע פשוטים.','Preparation turned willing volunteers into a useful team.','ההכנה הפכה מתנדבים מוכנים לצוות מועיל.'],
['public-meeting','The Public Meeting','האספה הציבורית','A public meeting discussed changes near the school.','אספה ציבורית דנה בשינויים ליד בית הספר.','The loudest speakers did not represent every resident.','הדוברים הקולניים ביותר לא ייצגו כל תושב.','Students collected written views and identified shared concerns.','תלמידים אספו עמדות כתובות וזיהו דאגות משותפות.','The final proposal reflected a wider range of needs.','ההצעה הסופית שיקפה מגוון רחב יותר של צרכים.']],
'3-A2':[
['recommendation-letter','The Recommendation Letter','מכתב ההמלצה','A student requested an unusually strong recommendation.','תלמיד ביקש מכתב המלצה חזק במיוחד.','The teacher wanted to help but could not support every claim.','המורה רצה לעזור אך לא יכול היה לתמוך בכל טענה.','He described genuine strengths and relevant areas for growth.','הוא תיאר חוזקות אמיתיות ותחומים מתאימים לשיפור.','Not only did the honest letter remain credible, but it also helped the student choose wisely.','לא רק שהמכתב הכנה נשאר אמין, הוא גם עזר לתלמיד לבחור בתבונה.'],
['unsafe-workplace','The Unsafe Workplace','מקום העבודה הלא בטוח','Young workers noticed an unprotected machine.','עובדים צעירים הבחינו במכונה ללא מיגון.','Previous warnings had been ignored before they joined the team.','אזהרות קודמות זכו להתעלמות לפני שהצטרפו לצוות.','Should the machine continue operating, someone could be seriously injured.','אם המכונה תמשיך לפעול, מישהו עלול להיפצע קשה.','They stopped the task and reported the risk through the proper channel.','הם עצרו את המשימה ודיווחו על הסיכון בערוץ המתאים.'],
['scholarship-application','The Scholarship Application','בקשת המלגה','A scholarship form invited students to describe hardship.','טופס מלגה הזמין תלמידים לתאר קושי.','One applicant considered exaggerating his circumstances.','מועמד אחד שקל להגזים בנסיבותיו.','Had he done so, the committee would have received a false picture.','אילו עשה זאת, הוועדה הייתה מקבלת תמונה כוזבת.','He submitted accurate evidence and explained his needs directly.','הוא הגיש ראיות מדויקות והסביר את צרכיו ישירות.'],
['study-screen-balance','The Study–Screen Balance','איזון בין לימודים למסך','Online study and entertainment filled the same device.','למידה ובידור מקוונים מילאו את אותו מכשיר.','By evening, students could no longer measure purposeful use.','עד הערב התלמידים כבר לא יכלו למדוד שימוש מכוון.','Only after they separated the activities did the pattern become clear.','רק לאחר שהפרידו בין הפעילויות התבנית התבהרה.','Planned breaks protected both concentration and physical health.','הפסקות מתוכננות הגנו גם על הריכוז וגם על הבריאות הגופנית.'],
['limited-budget','The Limited Community Budget','התקציב הקהילתי המוגבל','A committee could fund only one of several valuable projects.','ועדה יכלה לממן רק אחד מכמה פרויקטים חשובים.','Each proposal served a different group.','כל הצעה שירתה קבוצה אחרת.','Not only were immediate benefits considered, but long-term access was measured as well.','לא רק היתרונות המיידיים נשקלו, אלא גם הנגישות לטווח ארוך נמדדה.','The published criteria made the difficult choice understandable.','הקריטריונים שפורסמו הפכו את הבחירה הקשה למובנת.'],
['long-term-solution','The Long-Term Solution','הפתרון לטווח הארוך','Repeated repairs had solved the same problem temporarily.','תיקונים חוזרים פתרו זמנית את אותה בעיה.','The underlying cause had never been examined.','הגורם הבסיסי מעולם לא נבדק.','Only by studying the full system could the team prevent another failure.','רק באמצעות בחינת המערכת כולה הצוות יכול היה למנוע כשל נוסף.','The lasting solution cost more initially but saved future resources.','הפתרון המתמשך עלה יותר בתחילה אך חסך משאבים בעתיד.']],
'3-ES':[
['conflict-interest','The Conflict of Interest','ניגוד העניינים','A committee member evaluated a company owned by a relative.','A decision-maker reviewed a business connected to his family.','Although he believed he could remain objective, the connection was undisclosed.','He thought he could be fair, but others did not know about the relationship.','Not only did disclosure protect the process, but recusal protected public confidence.','Revealing the connection and stepping aside preserved trust.','Integrity required avoiding both bias and its reasonable appearance.','A fair process must also look fair to informed observers.'],
['incomplete-consent','The Incomplete Consent','ההסכמה החלקית','Participants agreed to a study without receiving its full explanation.','People accepted a project before all important facts were provided.','Had the missing risks been disclosed, some might have chosen differently.','Complete information could have changed their decisions.','The researchers paused the study and renewed consent properly.','They stopped, explained everything, and asked again.','Only informed and voluntary agreement could justify continuing.','Valid consent required knowledge as well as freedom of choice.'],
['whistleblower-choice','The Whistleblower’s Choice','בחירת חושף הליקויים','An employee discovered that safety records had been altered.','A worker found that official safety information had been changed.','Internal complaints had produced no correction.','Earlier reports inside the organization had not solved the problem.','Should silence continue, preventable harm would become more likely.','Remaining quiet would increase a danger that could be avoided.','She documented the evidence and used a protected reporting channel.','She preserved the facts and reported them through a safer formal process.'],
['biased-selection','The Biased Selection Process','הליך הבחירה המוטה','A selection system appeared neutral because every applicant received the same test.','The process looked fair because the written rule was identical for everyone.','Past data revealed that one irrelevant feature predicted rejection.','Earlier results showed a pattern unrelated to actual ability.','Only after the outcomes were examined did the hidden bias become visible.','The unfair pattern appeared only when the final results were compared.','Revised criteria improved both fairness and accuracy.','Better measures selected stronger candidates without the irrelevant disadvantage.'],
['controls-next-hour','Who Controls the Next Hour?','מי שולט בשעה הבאה?','A platform predicted which notification would keep each user online.','A service learned which alert would hold each person’s attention.','By the time students noticed the pattern, countless small choices had been automated.','Many decisions had already been shaped before users recognized it.','Not only did they disable alerts, but they also defined a purpose before logging in.','They removed prompts and decided in advance what they intended to do.','Autonomy grew when design stopped replacing intention.','They recovered control by making deliberate choices.'],
['good-intention','The Consequences of a Good Intention','תוצאותיה של כוונה טובה','A student published a struggling family’s story to raise support.','A student shared private hardship because he wanted to help.','The campaign succeeded, but personal details spread far beyond its purpose.','Money was raised, yet sensitive information reached an unintended audience.','Had privacy been considered at the start, the same aid could have been arranged safely.','Earlier planning could have protected the family while still meeting the need.','Good intentions did not remove responsibility for foreseeable consequences.','Ethical action required care about results as well as motives.']]
};

function padScenes(core,target,level,group,index){
 const [s1,s2,s3,s4]=core;
 const es=group==='ES';
 const bridge=es?[
  ['At first, the most convenient response seemed sufficient.','Initially, the easiest reaction appeared good enough.'],
  ['The students separated verified facts from assumptions.','They distinguished evidence from ideas that had not been checked.'],
  ['They considered who might be affected by each option.','They examined the possible effect on every relevant person.'],
  ['A respectful question exposed a weakness in the first plan.','A careful challenge revealed what the original idea had missed.'],
  ['They compared immediate results with longer-term consequences.','They looked beyond the first outcome to what might happen later.'],
  ['Responsibility continued after the initial decision.','Making a choice did not end their duty to review it.'],
  ['The evidence justified a measured change of direction.','The facts supported revising the original approach.'],
  ['Their final response balanced principle, evidence, and practical limits.','The decision respected values, facts, and real conditions.'],
  ['The experience changed how they approached similar choices.','What they learned influenced their later decisions.'],
  ['They explained both the conclusion and the reasoning behind it.','They made the result and its supporting logic clear.'],
  ['A later review confirmed which parts of the plan had worked.','They checked the outcome instead of merely assuming success.'],
  ['Uncertainty remained, but it no longer prevented responsible action.','They accepted what was unknown while still acting carefully.'],
  ['The lesson was not a slogan but a method they could repeat.','They gained a practical process, not merely a simple message.'],
  ['Others adopted the approach because its purpose was transparent.','People followed the method because they could understand its reason.'],
  ['Sustained attention proved more valuable than one impressive gesture.','Continued responsible action mattered more than a single dramatic act.'],
  ['The outcome demonstrated how informed judgment protects trust.','The result showed that careful reasoning preserves confidence.'],
  ['They documented what they would improve the next time.','They recorded a specific lesson for future action.'],
  ['By reflecting on the process, they turned experience into learning.','Reviewing their choices helped them learn from what happened.'],
  ['The final decision remained open to evidence-based revision.','They were prepared to change the conclusion if stronger facts appeared.']
 ]:[
  ['At first, the situation seemed simple.','בהתחלה המצב נראה פשוט.'],
  ['The students stopped before they reacted.','התלמידים עצרו לפני שהגיבו.'],
  ['They collected the important facts.','הם אספו את העובדות החשובות.'],
  ['They listened to more than one view.','הם הקשיבו ליותר מעמדה אחת.'],
  ['A quick choice could create another problem.','בחירה מהירה הייתה עלולה ליצור בעיה נוספת.'],
  ['They discussed several practical options.','הם דנו בכמה אפשרויות מעשיות.'],
  ['They chose a clear and fair plan.','הם בחרו תכנית ברורה והוגנת.'],
  ['Each person accepted a responsibility.','כל אחד קיבל אחריות.'],
  ['They checked the result together.','הם בדקו יחד את התוצאה.'],
  ['When new information appeared, they adjusted the plan.','כאשר הופיע מידע חדש, הם התאימו את התכנית.'],
  ['They explained the reason for their decision.','הם הסבירו את הסיבה להחלטתם.'],
  ['The change required patience and steady effort.','השינוי דרש סבלנות ומאמץ קבוע.'],
  ['Other people were also affected by the choice.','גם אנשים אחרים הושפעו מהבחירה.'],
  ['The group compared the benefits and the risks.','הקבוצה השוותה בין היתרונות לסיכונים.'],
  ['They measured the result instead of guessing.','הם מדדו את התוצאה במקום לנחש.'],
  ['The experience prepared them for a similar problem.','הניסיון הכין אותם לבעיה דומה.']
 ];
 const out=[s1,s2];let bi=0;
 while(out.length<target-2)out.push(bridge[(bi++ + index)%bridge.length]);
 out.push(s3,s4);
 // Controlled grammar progression: no inversion in A1; very limited inversion
 // in Grade 9 A2; regular advanced structures in Grade 10 A2 and ES.
 if(level===2&&group==='A2'&&index>=4&&out.length>7)
  out[6]=['Only after they had checked the evidence did they revise the plan.','רק לאחר שבדקו את הראיות הם שינו את התכנית.'];
 if(level===2&&group==='ES'&&index>=3&&out.length>9)
  out[8]=['Not only had they identified the risk, but they had also proposed a workable response.','They found the danger and developed a practical response before acting.'];
 if(level===3&&group==='A2'&&out.length>8)
  out[7]=['Only after they had compared the consequences did they make a final choice.','רק לאחר שהשוו בין התוצאות האפשריות הם קיבלו בחירה סופית.'];
 if(level===3&&group==='ES'&&out.length>10)
  out[9]=['Had they accepted the first explanation, the central weakness would have remained hidden.','If they had trusted the first explanation, they would not have found its main weakness.'];
 return out.slice(0,target).map(x=>A(x[0],x[1]));
}
const added=[];
Object.entries(data).forEach(([key,items])=>{
 const [levelText,group]=key.split('-'),level=Number(levelText);
 items.forEach((d,i)=>{
  const [slug,en,he,e1,h1,e2,h2,e3,h3,e4,h4]=d;
  added.push({id:`new-${key.toLowerCase()}-${slug}`,level,group,en,he,
   descEn:e4,descHe:group==='ES'?h4:h4,image:`story-covers-v2/simple-${slug}.svg`,sceneImages:null,
   simple:group==='ES',vocabularyTrack:level!==3||group==='A1'?'Band II':group==='A2'?'Lists A–D':'Lists A–D · advanced',
   scenes:padScenes([[e1,h1],[e2,h2],[e3,h3],[e4,h4]],targets[key][i],level,group,i)});
 });
});
window.STORIES.push(...added);

const newcomerStories=[
 {id:'new-3-a2-first-bell',level:3,group:'A2',en:'The First Bell',he:'הצלצול הראשון',
  descEn:'A confident student from Manchester discovers that fluent English does not make a new school simple.',descHe:'תלמידה שהגיעה ממנצ׳סטר מגלה שגם עם אנגלית מצוינת עדיין קשה להבין בית ספר חדש.',
  image:'story-covers-v2/simple-first-bell.svg',sceneImages:null,simple:false,vocabularyTrack:'Lists A–D',
  parentSummary:'תלמידה שהגיעה ממנצ׳סטר מתקשה להבין את סדר היום ואת ההודעות בבית הספר, וחברה לכיתה עוזרת לה להתמצא בלי להביך אותה.',
  parentLesson:'גם תלמיד בעל שפה חזקה עשוי להזדקק לעזרה שקטה ומעשית במקום חדש.',scenes:[
   A('The first bell rang while Lucy was still studying the Hebrew timetable.','הצלצול הראשון נשמע כאשר לוסי עדיין בחנה את מערכת השעות בעברית.'),
   A('She had arrived from Manchester only two weeks earlier.','היא הגיעה ממנצ׳סטר רק שבועיים קודם לכן.'),
   A('Her classmates heard her fluent English and assumed that school would be easy for her.','חבריה שמעו את האנגלית השוטפת שלה והניחו שבית הספר יהיה קל עבורה.'),
   A('Lucy smiled whenever somebody asked whether she needed help.','לוסי חייכה בכל פעם שמישהו שאל אם היא זקוקה לעזרה.'),
   A('In fact, the abbreviations beside each classroom number meant nothing to her.','למעשה, הקיצורים ליד כל מספר כיתה לא אמרו לה דבר.'),
   A('She followed a group upstairs, hoping that they were going to science.','היא הלכה בעקבות קבוצה במעלה המדרגות וקיוותה שהם בדרכם למדעים.'),
   A('When she entered, thirty younger students turned toward her.','כאשר נכנסה, שלושים תלמידים צעירים יותר הפנו אליה את מבטם.'),
   A('Lucy froze beside the door as the teacher gently explained that she was in the wrong room.','לוסי קפאה ליד הדלת כאשר המורה הסבירה בעדינות שהיא בכיתה הלא נכונה.'),
   A('By the time she reached science, the experiment had already begun.','כאשר הגיעה למדעים, הניסוי כבר התחיל.'),
   A('She hid the timetable under her notebook and pretended to understand the instructions.','היא הסתירה את המערכת מתחת למחברת והעמידה פנים שהיא מבינה את ההוראות.'),
   A('Maya noticed that Lucy copied every movement but never touched the equipment first.','מאיה הבחינה שלוסי מחקה כל תנועה אך לעולם אינה נוגעת ראשונה בציוד.'),
   A('During the break, Maya offered to mark the timetable with three simple colors.','בהפסקה הציעה מאיה לסמן את המערכת בשלושה צבעים פשוטים.'),
   A('Lucy almost refused, because she did not want to look helpless again.','לוסי כמעט סירבה מפני שלא רצתה להיראות שוב חסרת אונים.'),
   A('Then another bell rang, and she quietly handed Maya the folded page.','אז נשמע צלצול נוסף, והיא הושיטה בשקט למאיה את הדף המקופל.'),
   A('Only after Maya had explained the symbols did Lucy understand why she had been lost.','רק לאחר שמאיה הסבירה את הסמלים הבינה לוסי מדוע הלכה לאיבוד.'),
   A('The next morning, Lucy reached every classroom before the bell.','למחרת בבוקר הגיעה לוסי לכל כיתה לפני הצלצול.'),
   A('When a student from Leeds arrived a month later, Lucy recognized his careful smile.','כאשר תלמיד מלידס הגיע חודש לאחר מכן, לוסי זיהתה את חיוכו הזהיר.'),
   A('She placed a colored timetable on his desk without making an announcement.','היא הניחה מערכת צבעונית על שולחנו בלי להכריז על כך.'),
   A('“The blue rooms are upstairs,” she said, as if it were the most ordinary thing in the world.','״הכיתות הכחולות למעלה,״ אמרה כאילו היה זה הדבר הרגיל ביותר בעולם.'),
   A('This time, the first bell did not leave anyone behind.','הפעם הצלצול הראשון לא השאיר איש מאחור.') ]},
 {id:'new-3-es-unanswered-message',level:3,group:'ES',en:'The Message No One Answered',he:'ההודעה שאיש לא ענה עליה',
  descEn:'A student from Toronto misreads silence in the class group until one friend notices what the messages conceal.',descHe:'תלמיד שהגיע מטורונטו מפרש לא נכון את השתיקה בקבוצה הכיתתית, עד שחבר מבחין בקושי.',
  image:'story-covers-v2/simple-unanswered-message.svg',sceneImages:null,simple:true,vocabularyTrack:'Lists A–D · advanced',
  parentSummary:'תלמיד שהגיע מטורונטו מתקשה להבין את הקיצורים והשיחות בקבוצה הכיתתית וחושב בטעות שאינו רצוי.',
  parentLesson:'עזרה בהשתלבות דורשת לשים לב גם לקשיים שאדם מסתיר היטב.',scenes:[
   A('At 9:14 p.m., Noah typed, “Is anyone studying together tomorrow?”','Noah asked the class group whether anyone planned to study together.'),
   A('He had arrived from Toronto before the school year began.','He had come from Toronto shortly before classes started.'),
   A('In English lessons, he spoke with such confidence that classmates often asked him for help.','His strong English made other students view him as confident and capable.'),
   A('The class group was different: Hebrew abbreviations, private jokes, and rapid voice notes filled the screen.','The online group used short Hebrew forms and shared references he did not understand.'),
   A('Noah read his question again after ten minutes of silence.','He checked the unanswered message and began to feel uncomfortable.'),
   A('Several new messages appeared below it, but none answered him directly.','The conversation continued without responding to his invitation.'),
   A('He deleted the second message he had begun to write.','He chose not to ask again because he feared appearing needy.'),
   A('By morning, embarrassment had hardened into certainty: they did not want him there.','He interpreted the silence as rejection.'),
   A('During lunch, he returned a grammar book to Amit and declined a seat at the table.','He avoided the group even when a classmate made space for him.'),
   A('Amit noticed the same careful phrase Noah used whenever he was disappointed: “No problem.”','Amit recognized that Noah’s polite answer was hiding discomfort.'),
   A('He scrolled back through the class group and found Noah’s unanswered question between two long voice notes.','Amit located the message and saw how easily it had been overlooked.'),
   A('Only then did he realize that everyone had assumed somebody else would reply.','The silence had resulted from shared carelessness, not a deliberate refusal.'),
   A('Amit could have sent a private apology and ended the discomfort quietly.','A private response would have been easier and less embarrassing for the group.'),
   A('Instead, he wrote publicly: “We missed Noah’s question. That was not fair.”','Amit accepted responsibility in front of the class.'),
   A('The typing dots appeared, disappeared, and returned across Noah’s screen.','Several students hesitated before responding.'),
   A('Not only did three students invite Noah, but one also rewrote the plan without abbreviations.','The group offered both an invitation and information he could understand.'),
   A('Noah stood outside the library the next afternoon, unsure whether anyone would actually come.','He still feared that the online response might not become real action.'),
   A('When the lift doors opened, Amit arrived carrying four books and two cups of chocolate milk.','Amit’s arrival proved that the invitation was sincere.'),
   A('Noah laughed before Amit had time to apologize again.','Relief replaced the tension between them.'),
   A('A week later, the group added a simple rule: important plans had to be written clearly.','The class changed its communication so that fewer people would be excluded.'),
   A('Noah still corrected their English, but now they also paused to explain what he could not yet read.','Help became mutual rather than one-sided.'),
   A('The message remained in the chat as a quiet reminder that silence can say something nobody intended.','The unanswered question reminded them to notice the effect of accidental silence.') ]},
 {id:'new-3-es-winter-stage',level:3,group:'ES',en:'The Winter Stage',he:'במת החורף',
  descEn:'A skilled speaker from Melbourne accepts help with unfamiliar stage cues—and unexpectedly returns it.',descHe:'תלמידה שהגיעה ממלבורן נעזרת בחברה כדי להבין הוראות במה לא מוכרות, ובהמשך מחזירה את העזרה.',
  image:'story-covers-v2/simple-winter-stage.svg',sceneImages:null,simple:true,vocabularyTrack:'Lists A–D · advanced',
  parentSummary:'תלמידה שהגיעה ממלבורן נבחרת להנחות אירוע באנגלית, אך מגלה שהיא מתקשה להבין את הוראות הבמה המקומיות.',
  parentLesson:'קבלת עזרה אינה מפחיתה מיכולתנו; לעיתים היא מאפשרת לנו לעזור לאחרים ברגע החשוב.',scenes:[
   A('Sophie’s name was printed in large letters at the top of the winter ceremony program.','Sophie had been chosen for an important role in the school event.'),
   A('She had arrived from Melbourne with years of experience speaking on stage.','She was already a confident and experienced public speaker.'),
   A('The English script caused her no concern.','The words she had to read were easy for her.'),
   A('The handwritten Hebrew cues in the margin were another matter.','The short stage instructions beside the script were difficult to understand.'),
   A('Sophie mistook the instruction to pause for one telling her to leave the stage.','She misunderstood an important direction during rehearsal.'),
   A('When she walked away too early, the music began over an empty microphone.','Her mistake became visible and embarrassing.'),
   A('A few students laughed before the director stopped the rehearsal.','The public reaction increased her discomfort.'),
   A('Sophie closed the folder so quickly that one page tore near the clip.','Her physical reaction showed how deeply the mistake affected her.'),
   A('She considered giving the role to somebody else and blaming a sore throat.','She was tempted to escape without revealing the real difficulty.'),
   A('Rivka, the quiet student managing the lights, found her behind the curtain.','A classmate noticed that Sophie needed support.'),
   A('Rather than translating every word, Rivka drew four symbols beside the difficult cues.','Rivka offered practical help that preserved Sophie’s independence.'),
   A('They rehearsed until Sophie could follow the light changes without looking down.','Repeated practice turned the unfamiliar system into a usable one.'),
   A('Had Rivka simply taken the microphone herself, Sophie’s embarrassment would have remained hidden.','Doing the task for Sophie would not have solved the real problem.'),
   A('On the evening of the ceremony, heavy rain struck the roof above the hall.','An unexpected problem created new pressure during the live event.'),
   A('Halfway through the program, a power failure erased every cue light.','The system they depended on suddenly stopped working.'),
   A('For one long second, neither Sophie nor Rivka could see the next instruction.','Both students faced the same uncertainty.'),
   A('Then Sophie remembered the order they had practiced and continued without the screen.','Her preparation allowed her to act calmly.'),
   A('From the dark control desk, Rivka whispered that the emergency lamp would take a minute.','Rivka now depended on Sophie to hold the event together.'),
   A('Sophie stepped forward and invited the audience to finish the song with her.','She transformed the delay into a shared moment.'),
   A('By the time the lights returned, the entire hall was singing.','Her response succeeded before the technical problem was repaired.'),
   A('Not only had Rivka helped Sophie read the stage, but Sophie had also given Rivka time to restore it.','Their different abilities supported each other.'),
   A('After the applause, Sophie taped the torn page instead of hiding it.','She kept a visible reminder of the difficulty she had overcome.'),
   A('Beside Rivka’s four symbols, she wrote one English word: “Together.”','The final note expressed their changed relationship.') ]}
];
window.STORIES.push(...newcomerStories);

function parentLessonFor(s){
 const t=(s.id+' '+s.en).toLowerCase();
 if(/helmet|bicycle|scooter|safety|emergency/.test(t))return 'כללי בטיחות מגינים עלינו רק כאשר מקיימים אותם בפועל ובאופן עקבי.';
 if(/screen|video|feed|phone|attention|social/.test(t))return 'שימוש מאוזן ומכוון במסכים עוזר לשמור על זמן, בריאות וריכוז.';
 if(/homework|project|answer|ai-/.test(t))return 'כלים דיגיטליים צריכים לתמוך בלמידה ולא להחליף הבנה ועבודה אישית.';
 if(/photo|message|account|consent|privacy|confidential/.test(t))return 'חשוב לשמור על פרטיות, לבדוק הסכמה ולחשוב לפני שמפרסמים או מעבירים מידע.';
 if(/team|group|credit|selection|captain|runner/.test(t))return 'שיתוף הוגן והכרה בתרומתו של כל אדם מחזקים את הקבוצה כולה.';
 if(/rumor|headline|report|evidence|truth|witness/.test(t))return 'לפני שמאמינים או משתפים מידע, חשוב לבדוק את המקור ואת העובדות.';
 if(/student|school|glasses|appearance|lunch|welcome/.test(t))return 'תשומת לב ועזרה מכבדת יכולות לעזור לאדם חדש או בודד למצוא את מקומו.';
 if(/water|waste|garden|energy|environment|transport/.test(t))return 'פעולות קטנות המבוססות על אחריות יכולות ליצור שינוי סביבתי ממשי.';
 return 'התמודדות אחראית כוללת תשומת לב לאחרים, בדיקת העובדות ונכונות לקבל עזרה.';
}
function parentPedagogyFor(s){
 const count=s.scenes.length;
 if(s.group==='ES')return `This ${count}-sentence story is designed for advanced English speakers. It develops precise vocabulary, inference, emotional interpretation, and varied sentence structure. Complex grammar, including Past Perfect or inversion, is used only where it clarifies time, emphasis, or cause—not as decoration.`;
 if(s.group==='A1')return `הסיפור כולל ${count} משפטים קצרים וישירים. הוא מבוסס על אוצר מילים שימושי, רצף זמנים ברור וחזרה טבעית על מילים חשובות. העלילה נשארת מעניינת, אך העומס הלשוני והתחבירי נשמר נמוך ומתאים לקבוצת התמיכה.`;
 return `הסיפור כולל ${count} משפטים ברמת ביניים־גבוהה. הוא מתרגל אוצר מילים ישיר, קשרי סיבה ותוצאה, הסקת מסקנות ומשפטים מורכבים במידה מבוקרת. בכיתות הגבוהות משולב דקדוק מתקדם רק כאשר הוא משרת את העלילה והמשמעות.`;
}
function parentLessonEnFor(s){
 const t=(s.id+' '+s.en).toLowerCase();
 if(/helmet|bicycle|scooter|safety|emergency/.test(t))return 'Safety rules protect people only when they are followed consistently.';
 if(/screen|video|feed|phone|attention|social/.test(t))return 'Deliberate, balanced screen use protects time, health, and concentration.';
 if(/homework|project|answer|ai-/.test(t))return 'Digital tools should support learning rather than replace understanding and independent work.';
 if(/photo|message|account|consent|privacy|confidential/.test(t))return 'Responsible communication requires consent, privacy, and careful thought before sharing.';
 if(/team|group|credit|selection|captain|runner/.test(t))return 'Fair participation and recognition strengthen the entire group.';
 if(/rumor|headline|report|evidence|truth|witness/.test(t))return 'Claims should be checked against reliable evidence before they are accepted or shared.';
 if(/student|school|glasses|appearance|lunch|welcome/.test(t))return 'Quiet, respectful support can help a new or isolated student find a place in the community.';
 return 'Responsible action combines awareness of others, sound judgment, and willingness to accept help.';
}
window.STORIES.forEach(s=>{
 if(!s.parentSummary)s.parentSummary=/[א-ת]/.test(s.descHe||'')?s.descHe:`הסיפור עוסק ב${s.he} ובדרך שבה הדמויות מתמודדות עם מצב חדש.`;
 if(!s.parentLesson)s.parentLesson=parentLessonFor(s);
 if(!s.parentPedagogy)s.parentPedagogy=parentPedagogyFor(s);
 if(!s.parentSummaryEn)s.parentSummaryEn=s.descEn;
 if(!s.parentLessonEn)s.parentLessonEn=parentLessonEnFor(s);
});
})();
