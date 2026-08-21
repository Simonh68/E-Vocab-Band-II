(function(){
const explicit=new Set(['new-3-a2-first-bell','new-3-es-unanswered-message','new-3-es-winter-stage']);
const structures=[
 {en:'Unwelcome surprise',he:'הפתעה לא צפויה',lines:[
  ['The ordinary plan changed without warning.','התכנית הרגילה השתנתה ללא אזהרה.','The normal plan suddenly changed.'],
  ['For a moment, nobody moved.','לרגע איש לא זז.','Everyone stopped for a moment.'],
  ['The first response solved only the easiest part.','התגובה הראשונה פתרה רק את החלק הקל ביותר.','Their first action fixed only a small part.'],
  ['A second difficulty appeared almost immediately.','קושי נוסף הופיע כמעט מיד.','Another problem appeared very quickly.'],
  ['One student tried to hide how worried they had become.','אחד התלמידים ניסה להסתיר עד כמה נעשה מודאג.','One student tried not to show the worry.'],
  ['A classmate noticed the hesitation and stayed nearby.','חבר לכיתה הבחין בהיסוס ונשאר בקרבת מקום.','A friend saw the hesitation and did not leave.'],
  ['They changed the plan instead of pretending that nothing had happened.','הם שינו את התכנית במקום להעמיד פנים שדבר לא קרה.','They changed the plan and faced the problem.'],
  ['At the most difficult moment, a small detail showed them what to do.','ברגע הקשה ביותר פרט קטן הראה להם מה לעשות.','A small detail gave them an answer at the hardest moment.'],
  ['Relief came slowly, after the danger of another mistake had passed.','ההקלה הגיעה לאט, לאחר שחלפה הסכנה לטעות נוספת.','They relaxed only after another mistake was no longer likely.'],
  ['The interrupted plan became a lesson in adapting calmly.','התכנית שנקטעה הפכה לשיעור בהסתגלות רגועה.','They learned how to adjust when plans change.']]},
 {en:'Help from a friend',he:'קבלת עזרה מחבר',lines:[
  ['One student insisted on managing alone.','אחד התלמידים התעקש להסתדר לבדו.','One student wanted to do everything alone.'],
  ['Each failed attempt made the task feel more embarrassing.','כל ניסיון כושל הפך את המשימה למביכה יותר.','Every failed try caused more embarrassment.'],
  ['A friend offered help without taking control.','חבר הציע עזרה בלי להשתלט.','A friend offered support but did not take over.'],
  ['The offer was refused with a quick, careful smile.','ההצעה נדחתה בחיוך מהיר וזהיר.','The student smiled and said no at first.'],
  ['Soon the problem could no longer be hidden.','עד מהרה כבר לא היה אפשר להסתיר את הבעיה.','Soon everyone could see the problem.'],
  ['Asking for help required more courage than expected.','בקשת העזרה דרשה אומץ רב מהצפוי.','It was hard to ask for help.'],
  ['The friend explained one step and waited.','החבר הסביר צעד אחד והמתין.','The friend explained one step and gave time to try.'],
  ['The next attempt belonged to the learner, not the helper.','הניסיון הבא היה של הלומד, לא של המסייע.','The student completed the next try personally.'],
  ['Success changed the silence between them into laughter.','ההצלחה הפכה את השתיקה ביניהם לצחוק.','After succeeding, they laughed together.'],
  ['Later, the same support was quietly offered to somebody else.','בהמשך אותה תמיכה הוצעה בשקט לאדם אחר.','Later, another person received the same kind of help.']]},
 {en:'Mistake and repair',he:'טעות ותיקון',lines:[
  ['A small mistake seemed harmless at first.','טעות קטנה נראתה בתחילה חסרת חשיבות.','The first mistake did not seem serious.'],
  ['Correcting it immediately would have been uncomfortable.','תיקון מיידי היה עלול להיות לא נעים.','Fixing it at once would have felt embarrassing.'],
  ['Silence allowed the consequence to grow.','השתיקה אפשרה לתוצאה להחמיר.','The problem grew because nobody spoke.'],
  ['The student rehearsed an excuse but did not believe it.','התלמיד תרגל תירוץ אך לא האמין בו.','The student prepared an excuse that did not feel honest.'],
  ['Another person was about to accept the blame.','אדם אחר עמד לקבל עליו את האשמה.','Someone else was nearly blamed.'],
  ['That was the moment when hiding became worse than admitting the truth.','זה היה הרגע שבו ההסתרה נעשתה גרועה מההודאה באמת.','At that moment, hiding the mistake became the worse choice.'],
  ['The admission came in one short sentence.','ההודאה נאמרה במשפט קצר אחד.','The student admitted the truth in a few words.'],
  ['Repairing the damage required more work than expected.','תיקון הנזק דרש עבודה רבה מהצפוי.','Fixing the result took real effort.'],
  ['Trust did not return instantly, but the repair began.','האמון לא חזר מיד, אך התיקון התחיל.','Trust returned slowly after the honest action.'],
  ['The visible repair remained as a reminder of the honest choice.','התיקון הנראה לעין נשאר כתזכורת לבחירה הכנה.','The repaired object or situation became a reminder.']]},
 {en:'Misunderstanding',he:'אי־הבנה שמתבהרת',lines:[
  ['Two people saw the same event and understood it differently.','שני אנשים ראו אותו אירוע והבינו אותו אחרת.','Two people gave the event different meanings.'],
  ['Neither realized that an important detail was missing.','איש מהם לא הבין שפרט חשוב חסר.','They did not know that information was missing.'],
  ['A polite answer sounded cold to the person who received it.','תשובה מנומסת נשמעה קרה לאדם שקיבל אותה.','A polite reply seemed unfriendly.'],
  ['Distance grew through several small silences.','המרחק גדל בעקבות כמה רגעי שתיקה קטנים.','Several quiet moments pushed them apart.'],
  ['A third person noticed that both stories could not be complete.','אדם שלישי הבחין ששני הסיפורים אינם יכולים להיות שלמים.','A friend saw that both explanations were incomplete.'],
  ['One simple question revealed what each person had assumed.','שאלה פשוטה אחת חשפה מה כל אחד הניח.','One question showed the assumptions on both sides.'],
  ['The missing detail changed the meaning of the earlier actions.','הפרט החסר שינה את משמעות המעשים הקודמים.','New information changed the meaning of what had happened.'],
  ['Embarrassment replaced anger on both faces.','המבוכה החליפה את הכעס על פניהם של השניים.','Both people became embarrassed instead of angry.'],
  ['An apology was offered without arguing about who had suffered more.','נמסרה התנצלות בלי להתווכח מי נפגע יותר.','They apologized without competing over the hurt.'],
  ['Afterward, they asked before deciding what silence meant.','לאחר מכן הם שאלו לפני שהחליטו מה משמעות השתיקה.','Later, they checked before judging a quiet response.']]},
 {en:'Discovery',he:'גילוי בעקבות רמזים',lines:[
  ['A small inconsistency caught one student’s attention.','אי־התאמה קטנה משכה את תשומת לבו של תלמיד.','One student noticed that a small detail did not fit.'],
  ['Everyone else had passed it without stopping.','כל האחרים עברו לידו בלי לעצור.','Other people had not noticed it.'],
  ['The first explanation was reasonable but incomplete.','ההסבר הראשון היה הגיוני אך לא שלם.','The first explanation made sense but missed something.'],
  ['A second clue appeared in an unexpected place.','רמז נוסף הופיע במקום בלתי צפוי.','Another clue appeared somewhere surprising.'],
  ['Curiosity became concern as the clues began to connect.','הסקרנות הפכה לדאגה כאשר הרמזים התחברו.','The connected clues began to cause concern.'],
  ['The student shared the evidence instead of announcing a conclusion.','התלמיד שיתף את הראיות במקום להכריז על מסקנה.','The student showed the clues without claiming certainty.'],
  ['Together, the group tested the strongest explanation.','הקבוצה בדקה יחד את ההסבר החזק ביותר.','The group checked the best explanation together.'],
  ['The final clue revealed something nobody had expected.','הרמז האחרון חשף דבר שאיש לא ציפה לו.','The last clue revealed a surprise.'],
  ['The discovery required action, not merely excitement.','הגילוי דרש פעולה, לא רק התרגשות.','The discovery made action necessary.'],
  ['What began as a minor detail changed the entire situation.','מה שהתחיל כפרט שולי שינה את המצב כולו.','A small detail changed everything.']]},
 {en:'Race against time',he:'מרוץ נגד הזמן',lines:[
  ['A clear deadline turned an ordinary problem into an urgent one.','מועד ברור הפך בעיה רגילה לדחופה.','A deadline made the problem urgent.'],
  ['The first few minutes were lost to confusion.','הדקות הראשונות אבדו בגלל בלבול.','Confusion wasted important time.'],
  ['One student watched the clock while the others searched.','תלמיד אחד עקב אחר השעון בזמן שהאחרים חיפשו.','One student watched the time while others worked.'],
  ['A promising shortcut led them in the wrong direction.','קיצור דרך מבטיח הוביל אותם לכיוון הלא נכון.','A quick idea wasted more time.'],
  ['Frustration made their voices louder and their thinking less clear.','התסכול הגביר את קולם והחליש את חשיבתם.','Stress made it harder to think.'],
  ['They stopped for ten seconds and divided the remaining tasks.','הם עצרו לעשר שניות וחילקו את המשימות שנותרו.','They paused briefly and shared the work.'],
  ['One missing piece was found where nobody had looked.','חלק חסר נמצא במקום שאיש לא בדק.','They found the missing part in an overlooked place.'],
  ['The final action began just before time ran out.','הפעולה האחרונה התחילה רגע לפני תום הזמן.','They acted just before the deadline.'],
  ['The result was imperfect, but it prevented a greater loss.','התוצאה לא הייתה מושלמת, אך מנעה אובדן גדול יותר.','The result was not perfect, but it prevented something worse.'],
  ['They remembered that calm organization had saved more time than speed.','הם זכרו שארגון רגוע חסך יותר זמן ממהירות.','They learned that calm planning can be faster than rushing.']]},
 {en:'Second attempt',he:'כישלון וניסיון שני',lines:[
  ['The first attempt ended in public failure.','הניסיון הראשון הסתיים בכישלון לעיני כולם.','The first try failed in front of other people.'],
  ['The student wanted the moment to disappear.','התלמיד רצה שהרגע ייעלם.','The student wished the embarrassing moment could vanish.'],
  ['Repeating the same method would only repeat the result.','חזרה על אותה שיטה הייתה חוזרת על אותה תוצאה.','Using the same method would fail again.'],
  ['A careful observer pointed to one specific weakness.','מתבונן זהיר הצביע על חולשה מסוימת אחת.','Someone noticed one exact problem.'],
  ['Practice began privately, with smaller steps.','התרגול התחיל בפרטיות ובצעדים קטנים יותר.','The student practiced privately in smaller steps.'],
  ['Progress was slow enough to feel invisible.','ההתקדמות הייתה אטית עד שכמעט לא הורגשה.','The improvement was difficult to notice.'],
  ['The second opportunity arrived sooner than expected.','ההזדמנות השנייה הגיעה מוקדם מהצפוי.','Another chance came very soon.'],
  ['Fear returned at exactly the same point as before.','הפחד חזר בדיוק באותה נקודה כמו קודם.','The old fear returned during the second try.'],
  ['This time, the student used the changed method and continued.','הפעם התלמיד השתמש בשיטה החדשה והמשיך.','This time, the new method worked.'],
  ['The second result mattered because the first failure had not been hidden.','התוצאה השנייה הייתה משמעותית מפני שהכישלון הראשון לא הוסתר.','The success mattered because it followed an honest failure.']]},
 {en:'Unexpected ability',he:'יכולת מפתיעה',lines:[
  ['The quietest member of the group received the smallest role.','החבר השקט ביותר בקבוצה קיבל את התפקיד הקטן ביותר.','The quiet student was given the least important task.'],
  ['Others confused silence with lack of ability.','האחרים בלבלו בין שקט לבין חוסר יכולת.','People assumed that quietness meant weakness.'],
  ['When the main plan failed, the confident voices stopped.','כאשר התכנית המרכזית נכשלה, הקולות הבטוחים השתתקו.','The confident students became silent when the plan failed.'],
  ['The overlooked student had noticed a pattern nobody else had seen.','התלמיד שלא זכה לתשומת לב הבחין בתבנית שאיש אחר לא ראה.','The quiet student had seen an important pattern.'],
  ['Speaking up meant risking another dismissal.','דיבור בקול דרש להסתכן בדחייה נוספת.','Sharing the idea could lead to another rejection.'],
  ['A friend made space and asked everyone to listen.','חבר פינה מקום וביקש מכולם להקשיב.','A friend asked the group to listen carefully.'],
  ['The explanation was brief, precise, and difficult to ignore.','ההסבר היה קצר, מדויק וקשה להתעלמות.','The explanation was short and clear.'],
  ['The group followed the new lead at the critical moment.','הקבוצה פעלה לפי ההובלה החדשה ברגע המכריע.','The group used the new idea when it mattered most.'],
  ['Success exposed the unfairness of the earlier assumption.','ההצלחה חשפה את חוסר ההגינות שבהנחה הקודמת.','The result showed that their first judgment had been unfair.'],
  ['The next task began with roles chosen by ability rather than volume.','המשימה הבאה התחילה בחלוקת תפקידים לפי יכולת ולא לפי עוצמת הקול.','Later roles were based on skill, not loudness.']]},
 {en:'Promise under pressure',he:'הבטחה תחת לחץ',lines:[
  ['A promise had been easy to make when nothing stood in the way.','היה קל להבטיח כאשר דבר לא עמד בדרך.','The promise was easy before conditions changed.'],
  ['An unexpected opportunity suddenly competed with it.','הזדמנות בלתי צפויה התחרתה בה לפתע.','A new opportunity made the promise difficult.'],
  ['Breaking the promise could be explained, but not erased.','אפשר היה להסביר את הפרת ההבטחה, אך לא למחוק אותה.','There was an excuse, but the broken promise would still hurt.'],
  ['The student delayed answering and hoped the problem would solve itself.','התלמיד דחה את התשובה וקיווה שהבעיה תיפתר מעצמה.','The student waited instead of deciding.'],
  ['The person who was waiting began to prepare alone.','האדם שהמתין התחיל להתכונן לבדו.','The other person started working alone.'],
  ['Seeing that preparation made the real cost visible.','מראה ההכנה הזאת חשף את המחיר האמיתי.','That sight showed who would pay the price.'],
  ['The final choice required giving up something attractive.','הבחירה הסופית דרשה לוותר על דבר מושך.','Keeping the promise required a sacrifice.'],
  ['The promise was kept without demanding praise.','ההבטחה קוימה בלי לדרוש שבח.','The student kept the promise quietly.'],
  ['Disappointment remained, but so did trust.','האכזבה נשארה, אך גם האמון.','The student lost an opportunity but kept the trust.'],
  ['Later, the person who had waited remembered the action, not the explanation.','בהמשך האדם שהמתין זכר את המעשה, לא את ההסבר.','The action became more memorable than any excuse.']]},
 {en:'False appearance',he:'מראית עין מטעה',lines:[
  ['The evidence appeared convincing at first glance.','הראיות נראו משכנעות במבט ראשון.','At first, the evidence seemed clear.'],
  ['Its strongest detail was also the least carefully checked.','הפרט החזק ביותר היה גם זה שנבדק פחות מכולם.','The most convincing detail had not been checked carefully.'],
  ['People began repeating the conclusion as if it were a fact.','אנשים התחילו לחזור על המסקנה כאילו הייתה עובדה.','People repeated the claim as a fact.'],
  ['One student felt uneasy but feared sounding difficult.','תלמיד אחד חש אי־נוחות אך חשש להישמע טרחן.','One student had doubts but was afraid to speak.'],
  ['A comparison exposed a small but important difference.','השוואה חשפה הבדל קטן אך חשוב.','A comparison showed an important difference.'],
  ['The original source told a less dramatic story.','המקור המקורי הציג סיפור דרמטי פחות.','The first source did not support the dramatic claim.'],
  ['Admitting the error became harder after so many people had shared it.','ההודאה בטעות נעשתה קשה יותר לאחר שאנשים רבים שיתפו אותה.','Correcting the error was embarrassing after it had spread.'],
  ['The correction was posted as clearly as the original claim.','התיקון פורסם באופן ברור כמו הטענה המקורית.','They made the correction easy to see.'],
  ['Some damage remained even after the facts were restored.','חלק מן הנזק נשאר גם לאחר תיקון העובדות.','Correct facts could not remove every result of the mistake.'],
  ['The experience changed how quickly the group trusted appearances.','הניסיון שינה את המהירות שבה הקבוצה האמינה למראית עין.','The group became more careful about first impressions.']]},
 {en:'Chain reaction',he:'תגובת שרשרת',lines:[
  ['One small action produced an effect nobody had planned.','פעולה קטנה אחת יצרה תוצאה שאיש לא תכנן.','A small action caused an unexpected result.'],
  ['The first result triggered another, less harmless one.','התוצאה הראשונה הובילה לתוצאה נוספת ופחות תמימה.','The first result caused a more serious problem.'],
  ['By the time the connection was noticed, the effect had spread.','כאשר הבחינו בקשר התוצאה כבר התפשטה.','The effect had spread before anyone saw the pattern.'],
  ['Each part of the sequence had seemed harmless on its own.','כל חלק ברצף נראה חסר חשיבות בפני עצמו.','Each step had seemed harmless by itself.'],
  ['Putting the events in order revealed where the chain had begun.','סידור האירועים חשף היכן התחילה השרשרת.','The order of events showed the starting point.'],
  ['The room became quiet when the connection was explained.','החדר השתתק כאשר הקשר בין האירועים הוסבר.','Everyone became quiet when they understood the connection.'],
  ['Stopping the next effect mattered more than defending the first action.','עצירת התוצאה הבאה הייתה חשובה יותר מהגנה על הפעולה הראשונה.','Preventing more harm became more important than making excuses.'],
  ['They interrupted the sequence one step at a time.','הם עצרו את הרצף צעד אחר צעד.','They stopped the chain one step at a time.'],
  ['The final consequence was smaller than everyone had feared.','התוצאה הסופית הייתה קטנה ממה שכולם חששו.','They prevented the worst possible result.'],
  ['Afterward, one small preventive step was added at the beginning.','לאחר מכן נוסף צעד מניעה קטן בתחילת התהליך.','A small early safeguard prevented the chain from returning.']]},
 {en:'Role reversal',he:'היפוך תפקידים',lines:[
  ['The usual helper was the first person to become stuck.','מי שבדרך כלל עזר לאחרים היה הראשון שנתקע.','The person who usually helped others now needed help.'],
  ['Admitting difficulty felt unfamiliar and uncomfortable.','ההודאה בקושי הייתה זרה ולא נעימה.','It felt strange to admit the problem.'],
  ['The student who was normally helped noticed before anyone else.','התלמיד שבדרך כלל קיבל עזרה הבחין בכך ראשון.','The usual learner saw the problem first.'],
  ['The first offer of support was dismissed too quickly.','הצעת העזרה הראשונה נדחתה מהר מדי.','The helper refused support at first.'],
  ['Pressure increased until the old roles no longer made sense.','הלחץ גבר עד שהתפקידים הישנים איבדו משמעות.','The situation made the old roles impossible.'],
  ['A familiar instruction was repeated in the opposite direction.','הנחיה מוכרת נאמרה הפעם בכיוון ההפוך.','The learner used advice once received from the helper.'],
  ['Both students recognized the words and smiled despite the tension.','שני התלמידים זיהו את המילים וחייכו למרות המתח.','They recognized the advice and smiled.'],
  ['The new leader acted carefully rather than proudly.','המוביל החדש פעל בזהירות ולא בגאווה.','The new leader helped without showing pride.'],
  ['Together, they solved what neither could have solved alone.','יחד הם פתרו את מה שאיש מהם לא יכול היה לפתור לבדו.','They succeeded by combining their abilities.'],
  ['Afterward, asking for help no longer belonged to only one of them.','לאחר מכן בקשת עזרה כבר לא הייתה שייכת רק לאחד מהם.','Afterward, both felt free to ask for support.']]},
 {en:'Moral dilemma',he:'דילמה בין ערכים',lines:[
  ['Two reasonable choices protected different values.','שתי אפשרויות סבירות הגנו על ערכים שונים.','Both choices protected something important.'],
  ['Choosing either one would create a real cost.','בחירה בכל אחת מהן הייתה יוצרת מחיר ממשי.','Each choice also had a serious cost.'],
  ['The easiest answer ignored the person most affected.','התשובה הקלה ביותר התעלמה מן האדם שיושפע יותר מכולם.','The easiest answer ignored an affected person.'],
  ['The group separated facts from fear and personal advantage.','הקבוצה הפרידה בין עובדות, פחד ויתרון אישי.','They separated facts from fear and self-interest.'],
  ['They asked who would carry the cost of each decision.','הם שאלו מי יישא במחיר של כל החלטה.','They considered who would pay each cost.'],
  ['No option removed every difficulty.','שום אפשרות לא הסירה את כל הקושי.','No choice solved everything.'],
  ['The final choice protected the more important duty.','הבחירה הסופית הגנה על החובה החשובה יותר.','They chose the more important responsibility.'],
  ['They explained the decision without hiding its disadvantage.','הם הסבירו את ההחלטה בלי להסתיר את חסרונה.','They explained both the choice and its cost.'],
  ['Someone still felt disappointed after the decision.','מישהו עדיין חש אכזבה לאחר ההחלטה.','The right choice still disappointed someone.'],
  ['Accepting that cost made the decision credible.','קבלת המחיר הזה הפכה את ההחלטה לאמינה.','Accepting the cost showed that the choice was sincere.']]},
 {en:'Preparation pays off',he:'הכנה מוקדמת מוכיחה את עצמה',lines:[
  ['A routine exercise had once seemed unimportant.','תרגול שגרתי נראה בעבר חסר חשיבות.','A routine exercise had not seemed important.'],
  ['The students repeated it until each step became familiar.','התלמידים חזרו עליו עד שכל צעד נעשה מוכר.','They practiced until they knew every step.'],
  ['Some wondered whether the preparation would ever be useful.','כמה מהם תהו אם ההכנה תהיה אי פעם שימושית.','Some students doubted that the practice would matter.'],
  ['Then a real situation demanded a calm response.','ואז מצב אמיתי דרש תגובה רגועה.','A real situation suddenly required calm action.'],
  ['The first familiar step gave everyone time to think.','הצעד המוכר הראשון נתן לכולם זמן לחשוב.','The first practiced step created time to think.'],
  ['Each person completed the role practiced earlier.','כל אדם ביצע את התפקיד שתרגל קודם.','Everyone used a role practiced earlier.'],
  ['The preparation did not remove the difficulty.','ההכנה לא הסירה את הקושי.','Preparation did not make the problem disappear.'],
  ['It prevented confusion from making the situation worse.','היא מנעה מן הבלבול להחמיר את המצב.','It stopped confusion from making things worse.'],
  ['Afterward, the group improved one weak part of the routine.','לאחר מכן הקבוצה שיפרה חלק חלש אחד בשגרה.','Later they improved one weak part of the routine.'],
  ['The next practice felt connected to a real purpose.','התרגול הבא הרגיש מחובר למטרה אמיתית.','The next practice had a clear purpose.']]}
];

const extra=[
 ['A physical detail revealed the feeling before anyone named it.','פרט גופני חשף את הרגש לפני שמישהו קרא לו בשם.','A small movement showed the emotion.'],
 ['Nobody offered an easy speech or a perfect solution.','איש לא הציע נאום קל או פתרון מושלם.','There was no perfect answer.'],
 ['The next action was smaller, but more honest.','הפעולה הבאה הייתה קטנה יותר אך כנה יותר.','The next step was small and honest.'],
 ['A brief silence gave everyone time to reconsider.','שתיקה קצרה נתנה לכולם זמן לשקול מחדש.','A short silence allowed new thinking.'],
 ['The result affected somebody who had not been part of the first decision.','התוצאה השפיעה על אדם שלא היה חלק מן ההחלטה הראשונה.','The result reached another person.'],
 ['One earlier detail returned with a different meaning.','פרט מוקדם חזר עם משמעות שונה.','An earlier detail now meant something different.'],
 ['The group changed its behavior before discussing a moral.','הקבוצה שינתה את התנהגותה לפני שדנה במסר.','Their behavior changed before they explained the lesson.'],
 ['The ending did not erase the difficult moment.','הסיום לא מחק את הרגע הקשה.','The difficult moment still mattered at the end.'],
 ['What they remembered was the action taken under pressure.','מה שהם זכרו היה המעשה שנעשה תחת לחץ.','They remembered what someone did under pressure.'],
 ['A later choice showed that the lesson had lasted.','בחירה מאוחרת הראתה שהלקח נשמר.','A later action showed lasting change.']
];
function pair(row,group){return [[row[0],group==='ES'?row[2]:row[1]]]}
const chunkCoordinators=new Set(['and','but','or','so','yet']);
const chunkSubordinators=new Set(['although','because','before','after','while','when','whenever','where','whereas','if','unless','until','though']);
const chunkPrepositions=new Set(['from','with','without','beside','near','during','through','into','inside','outside','under','over','between','among','against','toward','towards','around','across','behind','beyond','instead']);
const chunkDeterminers=new Set(['a','an','the','this','that','these','those','my','your','his','her','our','their','each','every','another','two','three','several','some','any','no']);
const chunkPronouns=new Set(['i','you','he','she','we','they','it','who','which','someone','anyone','everyone','nobody']);
const chunkAuxiliaries=new Set(['am','is','are','was','were','be','been','being','have','has','had','do','does','did','will','would','can','could','should','must','may','might']);
const chunkIncompleteEnds=new Set(['one','two','three','its','most','entire','both','all','either','neither','only']);
// These adverbial focus items carry a complete, highly teachable meaning on
// their own. Isolate them only at a natural phrase edge; other words remain in
// short multiword constituents.
const pedagogicalFocusWords=new Set(['yet','still','already','again','together']);
const cleanChunkWord=word=>word.toLowerCase().replace(/^[^a-z]+|[^a-z]+$/g,'');
const chunkWordCount=text=>(text.match(/[A-Za-z]+(?:['’-][A-Za-z]+)*/g)||[]).length;
const isPedagogicalFocus=text=>chunkWordCount(text)===1&&pedagogicalFocusWords.has(cleanChunkWord(text));
function chunkBoundaryScore(tokens,index){
 if(index===tokens.length)return 12;
 const previous=tokens[index-1]||'',prev=cleanChunkWord(previous),next=cleanChunkWord(tokens[index]||'');
 let score=0;
 if(/[;:!?][”’"']?$/.test(previous))score+=10;
 else if(/,[”’"']?$/.test(previous))score+=8;
 else if(/[—–-][”’"']?$/.test(previous))score+=7;
 if(chunkCoordinators.has(next))score+=7;
 if(chunkSubordinators.has(next))score+=7;
 if(chunkPrepositions.has(next))score+=5;
 if(chunkDeterminers.has(next))score+=2;
 if(chunkPronouns.has(next))score+=1;
 // Keep grammatical glue inside the same listening unit.
 if(chunkDeterminers.has(prev)||chunkIncompleteEnds.has(prev)||chunkPrepositions.has(prev)||chunkAuxiliaries.has(prev)||prev==='not'||prev==='to')score-=12;
 if(chunkAuxiliaries.has(next)&&chunkPronouns.has(prev))score-=8;
 if(next==='not'&&chunkAuxiliaries.has(prev))score-=12;
 return score;
}
function isolatePedagogicalFocus(parts){
 const out=[];
 parts.forEach(part=>{
  const tokens=part.trim().split(/\s+/);
  const first=cleanChunkWord(tokens[0]||''),last=cleanChunkWord(tokens.at(-1)||'');
  // Sentence-final focus adverbs receive nuclear stress in ordinary speech.
  if(tokens.length>=3&&pedagogicalFocusWords.has(last)){
   out.push(tokens.slice(0,-1).join(' '),tokens.at(-1));return;
  }
  // A punctuation-marked sentence adverb is also a complete listening unit.
  if(tokens.length>=3&&pedagogicalFocusWords.has(first)&&/[,;:—–-]$/.test(tokens[0])){
   out.push(tokens[0],tokens.slice(1).join(' '));return;
  }
  out.push(part);
 });
 return out;
}
function splitEnglishConstituents(text,maxWords=6){
 const tokens=text.trim().split(/\s+/),n=tokens.length;
 if(chunkWordCount(text)<=maxWords)return isolatePedagogicalFocus([text.trim()]);
 const best=Array(n+1).fill(null);best[n]={score:0,parts:[]};
 for(let i=n-1;i>=0;i--){
  for(let j=i+2;j<=Math.min(n,i+maxWords);j++){
   if(!best[j])continue;
   const length=tokens.slice(i,j).reduce((sum,token)=>sum+chunkWordCount(token),0);
   if(length<2||length>maxWords)continue;
   const rhythm=length===4?0:length===5?-.5:length===3?-1:length===6?-1.5:-3;
   const candidate={score:rhythm+chunkBoundaryScore(tokens,j)+best[j].score,parts:[tokens.slice(i,j).join(' '),...best[j].parts]};
   if(!best[i]||candidate.score>best[i].score)best[i]=candidate;
  }
 }
 if(best[0])return isolatePedagogicalFocus(best[0].parts);
 // A final six-word unit is preferable to a one-word fragment.
 const out=[];for(let i=0;i<n;){let take=Math.min(maxWords,n-i);if(n-i-take===1)take--;if(take<2&&out.length){out[out.length-1]+=' '+tokens[i++];continue}out.push(tokens.slice(i,i+take).join(' '));i+=take}return isolatePedagogicalFocus(out);
}
const supportCuePatterns={
 from:/^(מן|מאת|מה|מ־)$/u,with:/^(עם|בעזרת|ביחד)$/u,without:/^(בלי|ללא)$/u,and:/^ו/u,
 before:/^לפני/u,after:/^(אחרי|לאחר)/u,because:/^(כי|מפני|בגלל)$/u,but:/^(אבל|אך|אולם)$/u,
 while:/^(בעוד|בזמן|כאשר)/u,when:/^(כאשר|כש)/u,until:/^עד/u,instead:/^במקום/u,
 near:/^(ליד|בסמוך)/u,beside:/^(ליד|לצד)/u,during:/^(במהלך|בעת)/u,between:/^בין/u,among:/^בין/u
};
const cleanSupportWord=word=>word.replace(/^[\s״“”'",.;:!?()\[\]{}—–-]+|[\s״“”'",.;:!?()\[\]{}—–-]+$/gu,'');
function supportBoundary(tokens,expected,previousEnglish,nextEnglish,min,max){
 const next=cleanChunkWord(nextEnglish.split(/\s+/)[0]||''),pattern=supportCuePatterns[next];
 const candidates=[];for(let i=min;i<=max;i++)candidates.push(i);candidates.sort((a,b)=>Math.abs(a-expected)-Math.abs(b-expected));
 if(pattern){const found=candidates.find(i=>pattern.test(cleanSupportWord(tokens[i]||'')));if(found!==undefined)return found}
 if(/,[”’"']?$/.test(previousEnglish)){const found=candidates.find(i=>/,[״”’"']?$/.test(tokens[i-1]||''));if(found!==undefined)return found}
 return Math.max(min,Math.min(max,expected));
}
function englishSupportBoundary(tokens,expected,min,max){
 let best=expected,bestScore=-Infinity;
 for(let index=min;index<=max;index++){
  const score=chunkBoundaryScore(tokens,index)*2-Math.abs(index-expected);
  if(score>bestScore){best=index;bestScore=score}
 }
 return best;
}
function moveTerminalFocus(englishParts,supportParts){
 const focuses={yet:'עדיין',still:'עדיין',again:'שוב',already:'כבר',together:'יחד'};
 englishParts.forEach((english,index)=>{
  const last=cleanChunkWord(english.trim().split(/\s+/).at(-1)||''),focus=focuses[last];if(!focus)return;
  if(isPedagogicalFocus(english)){
   // Give an isolated English focus word its exact one-word gloss. Any support
   // words assigned here by proportional alignment belong with the neighboring
   // phrase and are moved there before the gloss is replaced.
   const displaced=supportParts[index].split(/\s+/).map(cleanSupportWord).filter(word=>word&&word!==focus).join(' ');
   if(displaced&&supportParts.length>1){
    const receiver=index===0?1:index-1;
    supportParts[receiver]=receiver<index?supportParts[receiver]+' '+displaced:displaced+' '+supportParts[receiver];
   }
   supportParts.forEach((part,partIndex)=>{
    if(partIndex===index)return;
    supportParts[partIndex]=part.split(/\s+/).filter(word=>cleanSupportWord(word)!==focus).join(' ');
   });
   supportParts[index]=focus;return;
  }
  let source=-1,token=-1;
  for(let i=0;i<supportParts.length;i++){const words=supportParts[i].split(/\s+/),found=words.findIndex(word=>cleanSupportWord(word)===focus);if(found>=0){source=i;token=found;break}}
  if(source<0||source===index)return;
  const words=supportParts[source].split(/\s+/),original=words[token],prefix=original.match(/^[״“”'"(\[]+/u)?.[0]||'',suffix=original.match(/[״“”'"),.;:!?\]]+$/u)?.[0]||'';
  words[token]=prefix+suffix;supportParts[source]=words.filter(word=>cleanSupportWord(word)||/[״“”'"()[\]]/u.test(word)).join(' ').replace(/^([״“”'"(\[])\s+/u,'$1').replace(/\s+([,.;:!?])/g,'$1');
  const end=supportParts[index].match(/[״“”'"),.;:!?\]]+$/u)?.[0]||'';
  supportParts[index]=supportParts[index].slice(0,end? -end.length:undefined).trimEnd()+' '+focus+end;
 });
 return supportParts;
}
function alignSupportToChunks(english,englishParts,support,group){
 if(englishParts.length===1)return[support];
 const target=support.trim().split(/\s+/),totalEnglish=chunkWordCount(english),boundaries=[];let usedEnglish=0,last=0;
 for(let i=0;i<englishParts.length-1;i++){
  usedEnglish+=chunkWordCount(englishParts[i]);
  const expected=Math.round(usedEnglish/totalEnglish*target.length),min=last+1,max=target.length-(englishParts.length-i-1);
  const boundary=group==='ES'?englishSupportBoundary(target,expected,min,max):supportBoundary(target,expected,englishParts[i],englishParts[i+1],min,max);
  boundaries.push(boundary);last=boundary;
 }
 const parts=[];last=0;for(const boundary of [...boundaries,target.length]){parts.push(target.slice(last,boundary).join(' '));last=boundary}
 return group==='ES'?parts:moveTerminalFocus(englishParts,parts);
}
function pedagogicalScene(scene,group){
 const parts=[],fullSupport=scene.map(part=>part[1]).join(' ');
 scene.forEach(([english,support])=>{
  const englishParts=splitEnglishConstituents(english,6),supportParts=alignSupportToChunks(english,englishParts,support,group);
  englishParts.forEach((part,index)=>parts.push([part,group==='ES'?fullSupport:(supportParts[index]||support),fullSupport]));
 });
 // Only intentional focus words may remain isolated. Attach accidental
 // one-word fragments to the closest phrase.
 for(let i=0;i<parts.length;i++)if(chunkWordCount(parts[i][0])<2&&!isPedagogicalFocus(parts[i][0])&&parts.length>1){
  const neighbor=i===0?1:i-1;if(chunkWordCount(parts[i][0])+chunkWordCount(parts[neighbor][0])<=6){
   const support=group==='ES'?fullSupport:(neighbor<i?parts[neighbor][1]+' '+parts[i][1]:parts[i][1]+' '+parts[neighbor][1]);
   if(neighbor<i)parts[neighbor]=[parts[neighbor][0]+' '+parts[i][0],support,fullSupport];
   else parts[neighbor]=[parts[i][0]+' '+parts[neighbor][0],support,fullSupport];
   parts.splice(i,1);i--;
  }
 }
 return parts;
}
function normalizeSceneEnglish(scene){
 const noCommaBefore=/^(to|at|in|into|on|under|over|near|beside|inside|outside|among|during|after|before|because|when|while|using|with|without|from|for|that|rather\s+than)\b/i;
 return scene.map((part,index)=>{
  let english=part[0]
   .replace(/,\s+(to|at|in|into|on|under|over|near|beside|inside|outside|among|during|after|before|because|when|while|using|with|without|from|for|that)\b/gi,' $1')
   .replace(/,\s+rather than\b/gi,' rather than')
   .replace(/\s{2,}/g,' ');
  const next=scene[index+1]?.[0]?.trim()||'';
  if(/,$/.test(english)&&noCommaBefore.test(next))english=english.slice(0,-1);
  return[english,part[1]];
 });
}
// Carefully authored revisions keep the educational message inside a specific
// event. Dialogue supplies natural first- and second-person language, while
// the final action shows what the character learned without stating a moral.
const narrativeRevisions={
 'l1-a1-new-student':[
  [['Noam arrived at a new school,','נועם הגיע לבית ספר חדש,'],['and kept his backpack on during break.','והשאיר את התיק על גבו בזמן ההפסקה.']],
  [['He watched a ball game near the library,','הוא צפה במשחק כדור ליד הספרייה,'],['but did not know how to join.','אבל לא ידע איך להצטרף.']],
  [['Ari noticed Noam standing alone,','ארי הבחין בנועם עומד לבדו,'],['and rolled the ball toward him.','וגלגל את הכדור לעברו.']],
  [['“You can play with us,” Ari said.','״אתה יכול לשחק איתנו,״ אמר ארי.']],
  [['“I do not know the rules,” Noam admitted.','״אני לא מכיר את הכללים,״ הודה נועם.']],
  [['“We will show you,” Ari replied,','״אנחנו נראה לך,״ השיב ארי,'],['and the others made room.','והאחרים פינו מקום.']],
  [['Noam passed the ball to a teammate,','נועם מסר את הכדור לחבר לקבוצה,'],['and heard the group call his name.','ושמע את חברי הקבוצה קוראים בשמו.']],
  [['At lunch, he pulled out a chair for another new student','בארוחת הצהריים הוא משך כיסא עבור תלמיד חדש אחר'],['and said, “You can sit with us.”','ואמר: ״אתה יכול לשבת איתנו.״']]
 ],
 'l1-a1-lost-dog':[
  [['Leah and Tamar found a wet dog','לאה ותמר מצאו כלב רטוב'],['beside the school gate.','ליד שער בית הספר.']],
  [['Its collar had no phone number,','על הקולר שלו לא היה מספר טלפון,'],['and one paw was hurt.','ואחת מכפותיו הייתה פצועה.']],
  [['“I want to stay with him,” Leah said.','״אני רוצה להישאר איתו,״ אמרה לאה.']],
  [['“We can help him,','״אנחנו יכולות לעזור לו,'],['but we must tell an adult,” Tamar replied.','אבל אנחנו חייבות לספר למבוגר,״ השיבה תמר.']],
  [['“You hold the umbrella,” she added,','״את תחזיקי את המטרייה,״ הוסיפה,'],['“and I will call the guard.”','״ואני אתקשר לשומר.״']],
  [['The guard brought water','השומר הביא מים'],['and called the animal rescue center.','והתקשר למרכז להצלת בעלי חיים.']],
  [['While they waited, the girls spoke softly,','בזמן שהמתינו הבנות דיברו בשקט,'],['and the dog stopped shaking.','והכלב הפסיק לרעוד.']],
  [['When the owner arrived, she said,','כאשר בעלת הכלב הגיעה, היא אמרה:'],['“You kept him safe, and you stayed safe too.”','״שמרתן עליו, וגם שמרתן על עצמכן.״']],
  [['The next day, Leah wrote the rescue center’s number','למחרת לאה כתבה את המספר של מרכז ההצלה'],['inside her school notebook.','בתוך מחברת בית הספר שלה.']]
 ],
 'l1-a1-back-to-school':[
  [['Eli returned to school','אלי חזר לבית הספר'],['after several weeks at home.','לאחר כמה שבועות בבית.']],
  [['At the stairs, he held the rail','ליד המדרגות הוא אחז במעקה'],['and tried to lift his heavy bag.','וניסה להרים את התיק הכבד שלו.']],
  [['“I can carry it,” Eli insisted,','״אני יכול לשאת אותו,״ התעקש אלי,'],['although the bag pulled him off balance.','אף שהתיק הוציא אותו משיווי משקל.']],
  [['Noa stopped below him and said,','נועה עצרה מתחתיו ואמרה:'],['“You carry your notebook; we will carry the books.”','״אתה תיקח את המחברת שלך; אנחנו ניקח את הספרים.״']],
  [['Eli hesitated,','אלי היסס,'],['then handed her two books.','ואז מסר לה שני ספרים.']],
  [['In class, the teacher asked','בכיתה המורה שאלה'],['who had notes from the missed lessons.','למי יש סיכומים מהשיעורים שהחסיר.']],
  [['Three classmates placed their folders','שלושה חברים לכיתה הניחו את התיקיות שלהם'],['on Eli’s desk.','על שולחנו של אלי.']],
  [['“I missed more than homework,” Eli said','״התגעגעתי ליותר מאשר לשיעורי הבית,״ אמר אלי'],['when the group laughed over a science mistake.','כאשר הקבוצה צחקה מטעות במדעים.']],
  [['At break, his friends walked beside him','בהפסקה חבריו הלכו לצדו'],['without pulling him or rushing him.','בלי למשוך אותו ובלי לזרז אותו.']],
  [['A week later, Eli reached the top of the stairs','שבוע לאחר מכן אלי הגיע לראש המדרגות'],['and waited there for the friends who had waited for him.','והמתין שם לחברים שהמתינו לו.']]
 ],
 'l1-a2-no-phone':[
  [['On Monday, the class placed every phone','ביום שני הכיתה הניחה את כל הטלפונים'],['in a closed box until the final bell.','בקופסה סגורה עד הצלצול האחרון.']],
  [['“I will not last ten minutes,” Omer joked,','״אני לא אחזיק מעמד עשר דקות,״ התבדח עומר,'],['reaching toward his empty pocket.','ושלח את ידו אל הכיס הריק.']],
  [['At the first break, they stood together,','בהפסקה הראשונה הם עמדו יחד,'],['but nobody knew what to say.','אבל איש לא ידע מה לומר.']],
  [['Maya bounced a paper ball and asked,','מאיה הקפיצה כדור נייר ושאלה:'],['“What did we do before screens?”','״מה עשינו לפני המסכים?״']],
  [['“We talked,” Lior replied.','״דיברנו,״ השיב ליאור.'],['“You start.”','״את תתחילי.״']],
  [['Maya invented a question game,','מאיה המציאה משחק שאלות,'],['and everyone added one rule.','וכולם הוסיפו כלל אחד.']],
  [['When two students argued,','כאשר שני תלמידים התווכחו,'],['the group had to listen instead of checking phones.','הקבוצה נאלצה להקשיב במקום לבדוק את הטלפונים.']],
  [['“I thought I would miss my messages,” Omer said,','״חשבתי שאתגעגע להודעות שלי,״ אמר עומר,'],['“but I heard all of you.”','״אבל שמעתי את כולכם.״']],
  [['The next day, the phones were returned,','למחרת הטלפונים הוחזרו,'],['but at break the students placed them face down and continued the game.','אבל בהפסקה התלמידים הניחו אותם כשפניהם מטה והמשיכו במשחק.']]
 ],
 'l1-a2-last-runner':[
  [['Yoni finished last in every practice run,','יוני סיים אחרון בכל ריצת אימון,'],['and the beep of the stopwatch followed him.','וצפצוף שעון העצר ליווה אותו.']],
  [['After another slow lap,','לאחר עוד הקפה אטית,'],['he pulled at his shoelace and turned away.','הוא משך בשרוך נעלו והסתובב.']],
  [['“I slow everyone down,”','״אני מאט את כולם,״'],['he told the coach.','הוא אמר למאמן.']],
  [['The coach held up the stopwatch and said,','המאמן הרים את שעון העצר ואמר:'],['“You are racing yesterday’s time, not the other runners.”','״אתה מתחרה בזמן של אתמול, לא ברצים האחרים.״']],
  [['Dani stepped forward.','דני צעד קדימה.'],['“We can train one lap together.”','״אנחנו יכולים להתאמן יחד בהקפה אחת.״']],
  [['During the first week, Yoni’s time did not improve,','במהלך השבוע הראשון הזמן של יוני לא השתפר,'],['and he nearly stopped trying.','והוא כמעט הפסיק לנסות.']],
  [['On a rainy morning, Dani waited for him,','בבוקר גשום דני המתין לו,'],['and Yoni finished three seconds faster.','ויוני סיים מהר יותר בשלוש שניות.']],
  [['On race day, Yoni fell behind after the first turn,','ביום המרוץ יוני נשאר מאחור לאחר הפנייה הראשונה,'],['but he heard the finishers cheering.','אבל הוא שמע את המסיימים מעודדים.']],
  [['“Keep going—you are almost there!”','״המשך—אתה כמעט שם!״'],['they called.','הם קראו.']],
  [['Yoni crossed the line last, looked at the stopwatch,','יוני חצה את הקו אחרון, הביט בשעון העצר,'],['and whispered, “I beat my time.”','ולחש: ״שיפרתי את הזמן שלי.״']]
 ],
 'l2-a1-team-place':[
  [['“Choose five players,” Coach Eyal said,','״בחרו חמישה שחקנים,״ אמר המאמן אייל,'],['placing the basketball on the bench.','והניח את כדור הכדורסל על הספסל.']],
  [['Amit raised his hand,','עמית הרים את ידו,'],['but Ron and the taller boys called out first.','אבל רון והבנים הגבוהים יותר קראו ראשונים.']],
  [['Amit ran more slowly and rarely scored,','עמית רץ לאט יותר ולעיתים רחוקות קלע,'],['so he lowered his hand.','ולכן הוריד את ידו.']],
  [['During practice, the other team scored','במהלך האימון הקבוצה השנייה קלעה'],['three times from the same corner.','שלוש פעמים מאותה פינה.']],
  [['Amit noticed that number seven','עמית הבחין ששחקן מספר שבע'],['stepped back before every pass.','צעד לאחור לפני כל מסירה.']],
  [['He touched the coach’s arm and said,','הוא נגע בזרועו של המאמן ואמר:'],['“I think I know their next move.”','״אני חושב שאני יודע מה יהיה המהלך הבא שלהם.״']],
  [['Coach Eyal turned the board toward him.','המאמן אייל סובב אליו את הלוח.'],['“Show us.”','״תראה לנו.״']],
  [['Amit drew one short line.','עמית צייר קו קצר אחד.'],['“Ron, you stand here. I will watch number seven.”','״רון, אתה תעמוד כאן. אני אשמור על מספר שבע.״']],
  [['Ron looked at the board.','רון הביט בלוח.'],['“Will this really work?”','״זה באמת יעבוד?״']],
  [['On the next play, Amit shouted, “Left!”','במהלך הבא עמית צעק: ״שמאלה!״'],['and Ron stopped the pass.','ורון עצר את המסירה.']],
  [['“We need Amit on the court,”','״אנחנו צריכים את עמית על המגרש,״'],['Ron told the coach.','אמר רון למאמן.']],
  [['Amit did not score the winning basket;','עמית לא קלע את סל הניצחון;'],['he passed to the open player.','הוא מסר לשחקן הפנוי.']],
  [['At the next practice, Coach Eyal gave Amit the marker first','באימון הבא המאמן אייל נתן לעמית ראשון את הטוש'],['and said, “Show us the plan.”','ואמר: ״תראה לנו את התכנית.״']]
 ],
 'l1-a1-broken-pencil':[
  [['Nadav’s pencil broke just before the lesson began.','העיפרון של נדב נשבר ממש לפני תחילת השיעור.']],
  [['He searched his bag,','הוא חיפש בתיק שלו,'],['but found only an empty pencil case.','אבל מצא רק קלמר ריק.']],
  [['Sara noticed the half-finished answer on his page.','שרה הבחינה בתשובה שלא הושלמה בדף שלו.']],
  [['“Do you need a pencil?” she asked quietly.','״אתה צריך עיפרון?״ היא שאלה בשקט.']],
  [['Nadav nodded,','נדב הנהן,'],['but looked down because he felt embarrassed.','אבל השפיל מבט כי הרגיש נבוך.']],
  [['Sara placed a sharp pencil beside his notebook.','שרה הניחה עיפרון מחודד ליד המחברת שלו.']],
  [['“What will you use?” Nadav asked.','״במה את תשתמשי?״ שאל נדב.']],
  [['She showed him a second, shorter pencil.','היא הראתה לו עיפרון שני וקצר יותר.']],
  [['Nadav finished the page before the bell.','נדב סיים את הדף לפני הצלצול.']],
  [['At break, he sharpened his broken pencil','בהפסקה הוא חידד את העיפרון השבור שלו'],['and returned Sara’s pencil.','והחזיר לשרה את העיפרון שלה.']],
  [['The next day, he added a spare pencil to the class supply box.','למחרת הוא הוסיף עיפרון נוסף לקופסת הציוד הכיתתית.']]
 ],
 'l1-a2-spare-seat':[
  [['The crowded bus had one empty seat beside Amir.','באוטובוס הצפוף היה מושב פנוי אחד ליד אמיר.']],
  [['Amir had placed his schoolbag on it','אמיר הניח עליו את תיק בית הספר שלו'],['after a long day.','אחרי יום ארוך.']],
  [['At the next stop, an older passenger entered','בתחנה הבאה נכנסה נוסעת מבוגרת'],['with a heavy shopping bag.','עם שקית קניות כבדה.']],
  [['She held the rail while the bus moved.','היא אחזה במעקה בזמן שהאוטובוס נסע.']],
  [['Amir looked at his bag,','אמיר הביט בתיק שלו,'],['then at the passenger’s shaking hand.','ואז בידה הרועדת של הנוסעת.']],
  [['He lifted the bag onto his knees.','הוא הרים את התיק אל ברכיו.']],
  [['“Please sit here,” he said.','״בבקשה שבי כאן,״ אמר.']],
  [['The passenger sat down and thanked him.','הנוסעת התיישבה והודתה לו.']],
  [['When her shopping bag slipped,','כאשר שקית הקניות שלה החליקה,'],['Amir caught it before it fell.','אמיר תפס אותה לפני שנפלה.']],
  [['At his stop, he carried the bag to the door for her.','בתחנה שלו הוא נשא עבורה את השקית עד הדלת.']],
  [['“This is my stop too,” she said with a smile.','״זאת גם התחנה שלי,״ אמרה בחיוך.']],
  [['On the next crowded ride, Amir kept his schoolbag on his knees.','בנסיעה הצפופה הבאה אמיר השאיר את תיקו על ברכיו.']]
 ],
 'new-1-a1-safe-bicycle-ride':[
  [['Ari checked his bicycle before leaving.','ארי בדק את אופניו לפני שיצא.']],
  [['He wore a helmet and tested the brakes.','הוא חבש קסדה ובדק את הבלמים.']],
  [['A loose reflector moved near the back wheel.','מחזיר אור רופף זז ליד הגלגל האחורי.']],
  [['“We are already late,” his friend said.','״אנחנו כבר מאחרים,״ אמר חברו.']],
  [['“We will be later if the bicycle is not safe,” Ari replied.','״נאחר יותר אם האופניים אינם בטוחים,״ השיב ארי.']],
  [['They used a small tool to tighten the reflector.','הם השתמשו בכלי קטן כדי לחזק את מחזיר האור.']],
  [['Ari tested the brakes once more.','ארי בדק שוב את הבלמים.']],
  [['They rode on the bicycle path','הם רכבו בשביל האופניים'],['and kept space between them.','ושמרו מרחק ביניהם.']],
  [['At the crossing, Ari stopped and looked both ways.','במעבר החצייה ארי עצר והביט לשני הכיוונים.']],
  [['They arrived a few minutes late, but safely.','הם הגיעו באיחור של כמה דקות, אבל בבטחה.']],
  [['Before the next ride, his friend checked the bicycle first.','לפני הרכיבה הבאה חברו בדק ראשון את האופניים.']]
 ],
 'l2-es-accessible-trip':[
  [['The class chose a mountain trail for its annual trip.','The class selected a mountain walk for the yearly trip.']],
  [['Part of the route was inaccessible to Maya,','Maya could not use part of the route,'],['who used a wheelchair.','because she used a wheelchair.']],
  [['One student suggested carrying her over the steep section.','One student suggested lifting her over the difficult part.']],
  [['“I want a real way to take part,','Maya said that she wanted to participate fully,'],['not a dangerous favor,” Maya replied.','not receive unsafe help.']],
  [['The group studied three trail maps.','The class compared three maps.']],
  [['A second trail reached the same viewpoint','Another trail reached the same view'],['with a longer but smoother path.','by a longer, smoother route.']],
  [['Two students tested it with Maya after school.','Two students tried the route with Maya.']],
  [['A narrow gate still blocked one section.','One narrow gate still blocked the path.']],
  [['The park ranger opened an accessible side gate','The ranger showed them a wider side entrance'],['that had not appeared on the map.','that was missing from the map.']],
  [['The revised route still included hills and uneven ground.','The new route was still physically challenging.']],
  [['The class added rest points','The class planned places to rest'],['without shortening the whole experience.','without reducing the trip.']],
  [['Maya chose to lead the map team.','Maya led the students using the map.']],
  [['On the trip, sudden rain made one turn slippery.','Rain made one turn difficult during the trip.']],
  [['Maya noticed a covered path beside the visitor center.','Maya saw a covered path nearby.']],
  [['Her direction kept the group moving safely.','Her idea helped everyone continue safely.']],
  [['At the viewpoint, nobody had arrived by being carried.','Everyone reached the viewpoint independently.']],
  [['The class shared the same climb, view, and tired laughter.','The whole class shared the challenge and the view.']],
  [['Afterward, they added the side gate to the school map.','Later they corrected the school’s trail map.']],
  [['The adapted trip challenged everyone and excluded nobody.','The changed trip remained challenging and included everyone.']]
 ],
 'new-3-a1-first-job-interview':[
  [['Noa prepared for her first job interview.','נועה התכוננה לריאיון העבודה הראשון שלה.']],
  [['She studied the role and practiced direct answers.','היא למדה על התפקיד ותרגלה תשובות ישירות.']],
  [['While she waited,','בזמן שהמתינה,'],['she read the job description once more.','היא קראה שוב את תיאור התפקיד.']],
  [['The first question was different from the questions she had practiced.','השאלה הראשונה הייתה שונה מן השאלות שתרגלה.']],
  [['Noa paused and asked the interviewer to repeat it.','נועה עצרה וביקשה מן המראיין לחזור עליה.']],
  [['Then she answered with a clear example from school.','אחר כך היא ענתה בעזרת דוגמה ברורה מבית הספר.']],
  [['When he asked about unfamiliar software,','כאשר שאל על תוכנה שלא הכירה,'],['Noa did not pretend to know it.','נועה לא העמידה פנים שהיא מכירה אותה.']],
  [['“I have not used it yet,','״עדיין לא השתמשתי בה,'],['but I can learn,” she said.','אבל אני יכולה ללמוד,״ אמרה.']],
  [['The interviewer asked how she usually learned a new task.','המראיין שאל כיצד היא לומדת בדרך כלל משימה חדשה.']],
  [['Noa described the steps she had used to prepare.','נועה תיארה את הצעדים שבהם השתמשה כדי להתכונן.']],
  [['Two days later, the shop invited her to a training shift.','כעבור יומיים החנות הזמינה אותה למשמרת הכשרה.']],
  [['Before that shift, she practiced one new skill instead of memorizing more answers.','לפני המשמרת היא תרגלָה מיומנות חדשה אחת במקום לשנן עוד תשובות.']]
 ],
 'new-3-a1-emergency-team':[
  [['Residents created a local emergency team.','התושבים הקימו צוות חירום מקומי.']],
  [['They mapped skills, equipment, and people who might need help.','הם מיפו מיומנויות, ציוד ואנשים שעשויים להזדקק לעזרה.']],
  [['At the first meeting, everyone wanted to help,','במפגש הראשון כולם רצו לעזור,'],['but nobody had a clear role.','אבל לאיש לא היה תפקיד ברור.']],
  [['Lina pointed to an apartment on the map.','לינה הצביעה על דירה במפה.']],
  [['“Who calls Mr. Barak if the power fails?” she asked.','״מי מתקשר למר ברק אם החשמל נפסק?״ שאלה.']],
  [['The room became quiet.','החדר השתתק.']],
  [['The team divided the street into small areas.','הצוות חילק את הרחוב לאזורים קטנים.']],
  [['Each pair received a contact list and one simple task.','כל זוג קיבל רשימת קשר ומשימה פשוטה אחת.']],
  [['During the first practice, one phone did not answer.','במהלך התרגול הראשון טלפון אחד לא נענה.']],
  [['The pair used the backup contact instead of guessing.','הזוג השתמש באיש הקשר החלופי במקום לנחש.']],
  [['Another volunteer discovered that a flashlight had no batteries.','מתנדב אחר גילה שבפנס לא היו סוללות.']],
  [['They added batteries and checked every equipment box.','הם הוסיפו סוללות ובדקו כל קופסת ציוד.']],
  [['A second practice began without a long speech.','תרגול שני התחיל בלי נאום ארוך.']],
  [['Messages moved from house to house in the planned order.','ההודעות עברו מבית לבית לפי הסדר המתוכנן.']],
  [['Lina marked one slow point on the map.','לינה סימנה נקודה אטית אחת במפה.']],
  [['The team changed that route before the next practice.','הצוות שינה את המסלול לפני התרגול הבא.']],
  [['Clear roles turned willing neighbors into a useful emergency team.','תפקידים ברורים הפכו שכנים שרצו לעזור לצוות חירום יעיל.']]
 ]
};
const narrativeMetadata={
 'l1-a1-new-student':{
  arcEn:'Help from a friend',arcHe:'קבלת עזרה מחבר',
  lesson:'הזמנה קטנה יכולה לפתוח דלת לשייכות. קבלת פנים אמיתית ניכרת כאשר מי שקיבל מקום מפנה מקום לאחר.'
 },
 'l1-a1-lost-dog':{
  arcEn:'Rescue or intervention',arcHe:'חילוץ והתערבות אחראית',
  lesson:'חמלה כלפי בעל חיים צריכה לבוא יחד עם שמירה על בטיחות, פנייה למבוגר וחלוקת אחריות.'
 },
 'l1-a1-back-to-school':{
  arcEn:'Help from a friend',arcHe:'קבלת עזרה מחבר',
  lesson:'עזרה מכבדת מאפשרת לאדם לשמור על עצמאותו. החברים מסייעים במה שנדרש וממתינים לקצב שלו.'
 },
 'l1-a2-no-phone':{
  arcEn:'Discovery through experience',arcHe:'גילוי באמצעות התנסות',
  lesson:'שימוש מאוזן בטלפון מאפשר לשמור על קשר דיגיטלי בלי לאבד שיחה, הקשבה ונוכחות.'
 },
 'l1-a2-last-runner':{
  arcEn:'Second attempt',arcHe:'כישלון וניסיון שני',
  lesson:'התקדמות נמדדת לא רק במקום מול אחרים אלא גם בשיפור אישי. עידוד והתמדה הופכים מאמץ להישג.'
 },
 'l2-a1-team-place':{
  arcEn:'Unexpected ability',arcHe:'יכולת מפתיעה',
  lesson:'קבוצה מתחזקת כאשר היא מזהה סוגים שונים של יכולת. שחקן שקט או אטי יותר עשוי לראות מה שאחרים מחמיצים.'
 }
};
const sceneCorrections={
 'new-3-a2-first-bell':{
  13:[['Lucy whispered, “I need help with this page,”','לוסי לחשה: ״אני צריכה עזרה עם הדף הזה,״'],['and handed Maya the folded timetable.','והושיטה למאיה את מערכת השעות המקופלת.']],
  18:[['“You will find the blue rooms upstairs,” she said,','״את הכיתות הכחולות תמצא למעלה,״ אמרה,'],['as if it were the most ordinary thing in the world.','כאילו היה זה הדבר הרגיל ביותר בעולם.']]
 },
 'new-3-es-unanswered-message':{
  18:[['Noah laughed and said, “You came before I could worry again.”','Noah laughed and said that Amit had arrived before he could begin worrying again.']]
 },
 'new-3-es-winter-stage':{
  10:[['Rivka said, “I will draw four symbols;','Rivka offered to draw four simple symbols,'],['you follow the lights.”','and Sophie would follow the lights.']],
  18:[['Sophie stepped forward and asked,','Sophie moved toward the audience and asked for their help.'],['“Will you finish the song with me?”','She invited them to finish the song with her.']]
 }
};
const arcVoices={
 'Unwelcome surprise':[
  ['“This is not what we planned,” someone said.','״זה לא מה שתכננו,״ אמר מישהו.','Someone said that the plan had changed.'],
  ['“What can we still do?” another person asked.','״מה אנחנו עדיין יכולים לעשות?״ שאל אדם אחר.','Another person asked what was still possible.'],
  ['They moved closer and looked at the problem together.','הם התקרבו ובחנו יחד את הבעיה.','They examined the problem together.'],
  ['“You check this part; I will check the other.”','״אתה תבדוק את החלק הזה; אני אבדוק את האחר.״','They divided the checking between them.'],
  ['The first new idea failed, and they stopped again.','הרעיון החדש הראשון נכשל, והם עצרו שוב.','Their first new idea did not work.'],
  ['“We need a different plan,” the group agreed.','״אנחנו צריכים תכנית אחרת,״ הסכימה הקבוצה.','The group agreed to change the plan.']
 ],
 'Help from a friend':[
  ['“I can manage alone,” the student said.','״אני יכול להסתדר לבד,״ אמר התלמיד.','The student first refused help.'],
  ['“You do not have to do everything alone,” a friend replied.','״אתה לא חייב לעשות הכול לבד,״ השיב חבר.','A friend said that help was available.'],
  ['The next attempt ended at the same difficult point.','הניסיון הבא נעצר באותה נקודה קשה.','The next attempt failed at the same point.'],
  ['“Show me one step, but let me do the rest.”','״תראה לי צעד אחד, אבל תן לי לעשות את השאר.״','The student accepted limited help.'],
  ['They worked side by side; nobody took control.','הם עבדו זה לצד זה; איש לא השתלט.','They worked together without taking over.'],
  ['Later the student said, “Now I can help you.”','לאחר מכן אמר התלמיד: ״עכשיו אני יכול לעזור לך.״','Later the learner offered help to someone else.']
 ],
 'Mistake and repair':[
  ['“Maybe nobody will notice,” the student whispered.','״אולי אף אחד לא ישים לב,״ לחש התלמיד.','The student hoped the mistake would stay hidden.'],
  ['Then the mistake caused trouble for somebody else.','ואז הטעות גרמה צרה לאדם אחר.','The mistake began to affect another person.'],
  ['“You did not do this, did you?” a classmate asked.','״אתה לא עשית את זה, נכון?״ שאל חבר לכיתה.','A classmate asked who was responsible.'],
  ['“I did it, and I need to fix it.”','״אני עשיתי את זה, ואני צריך לתקן את זה.״','The student admitted the mistake.'],
  ['The others did not smile, but they made room for the repair.','האחרים לא חייכו, אבל הם פינו מקום לתיקון.','The others allowed the repair to begin.'],
  ['“We can trust the truth more than an excuse,” one person said.','״אנחנו יכולים לבטוח באמת יותר מאשר בתירוץ,״ אמר אדם אחד.','One person valued the truth over an excuse.']
 ],
 'Misunderstanding':[
  ['“Why did you ignore me?” one person asked.','״למה התעלמת ממני?״ שאל אדם אחד.','One person asked why they had been ignored.'],
  ['“I thought you wanted to be alone,” came the answer.','״חשבתי שרצית להיות לבד,״ הגיעה התשובה.','The other person explained the misunderstanding.'],
  ['They looked again at the detail both had missed.','הם הביטו שוב בפרט ששניהם החמיצו.','They reconsidered a missing detail.'],
  ['“We heard the same words differently.”','״שמענו את אותן מילים בצורה שונה.״','They realized that they had interpreted the words differently.'],
  ['“Can we start again?” one of them asked.','״אנחנו יכולים להתחיל מחדש?״ שאל אחד מהם.','One person asked for a new start.'],
  ['Later, they asked a question instead of guessing.','לאחר מכן הם שאלו שאלה במקום לנחש.','Later they checked instead of assuming.']
 ],
 'Discovery':[
  ['“Look at this small detail,” one student said.','״תסתכלו על הפרט הקטן הזה,״ אמר תלמיד אחד.','One student pointed out a small detail.'],
  ['“I saw it, but I thought it did not matter.”','״ראיתי אותו, אבל חשבתי שהוא לא חשוב.״','Another student had noticed it earlier.'],
  ['They placed the two clues beside each other.','הם הניחו את שני הרמזים זה לצד זה.','They compared two clues.'],
  ['“You check the first clue; we will check the second.”','״אתה תבדוק את הרמז הראשון; אנחנו נבדוק את השני.״','They divided the investigation.'],
  ['The last clue changed what the first one meant.','הרמז האחרון שינה את משמעותו של הראשון.','The final clue changed their understanding.'],
  ['“Now we know what to do,” the group said.','״עכשיו אנחנו יודעים מה לעשות,״ אמרה הקבוצה.','The discovery led to action.']
 ],
 'Race against time':[
  ['“We have very little time,” someone warned.','״יש לנו מעט מאוד זמן,״ הזהיר מישהו.','Someone warned that time was short.'],
  ['“You search here; I will ask for help.”','״אתה תחפש כאן; אני אבקש עזרה.״','They divided the urgent work.'],
  ['A quick shortcut failed and cost them another minute.','קיצור דרך מהיר נכשל ועלה להם בדקה נוספת.','A shortcut wasted more time.'],
  ['“Stop. We are rushing and missing things.”','״עצרו. אנחנו ממהרים ומחמיצים דברים.״','One person made the group pause.'],
  ['They shared the remaining tasks and started again.','הם חילקו את המשימות שנותרו והתחילו שוב.','They reorganized the work.'],
  ['“We made it,” somebody said as the final task ended.','״הצלחנו,״ אמר מישהו כאשר המשימה האחרונה הסתיימה.','They finished at the last moment.']
 ],
 'Second attempt':[
  ['“I cannot do that again,” the student said.','״אני לא יכול לעשות את זה שוב,״ אמר התלמיד.','The student feared another attempt.'],
  ['“You do not need to use the same method,” a friend replied.','״אתה לא צריך להשתמש באותה שיטה,״ השיב חבר.','A friend suggested a different method.'],
  ['They changed one small step and practiced it slowly.','הם שינו צעד קטן אחד ותרגלו אותו לאט.','They practiced one changed step.'],
  ['“We will try it together once, then you will try.”','״ננסה זאת יחד פעם אחת, ואז אתה תנסה.״','They planned a supported practice.'],
  ['The old fear returned when the difficult moment came.','הפחד הישן חזר כאשר הגיע הרגע הקשה.','The student felt the old fear again.'],
  ['“I am ready to try again,” the student said.','״אני מוכן לנסות שוב,״ אמר התלמיד.','The student chose to make a second attempt.']
 ],
 'Unexpected ability':[
  ['“Can I show you something?” the quiet student asked.','״אפשר להראות לכם משהו?״ שאל התלמיד השקט.','The quiet student asked to share an idea.'],
  ['The louder voices stopped for the first time.','הקולות הרמים השתתקו לראשונה.','The group became quiet and listened.'],
  ['“You noticed this before all of us?” a teammate asked.','״אתה הבחנת בזה לפני כולנו?״ שאל חבר לקבוצה.','A teammate recognized the student’s observation.'],
  ['“I have been watching it from the beginning.”','״אני צופה בזה מההתחלה.״','The student explained how the detail was noticed.'],
  ['They followed the idea when the next problem appeared.','הם פעלו לפי הרעיון כאשר הופיעה הבעיה הבאה.','The group tested the idea.'],
  ['At the next meeting someone asked, “What do you think?”','במפגש הבא שאל מישהו: ״מה אתה חושב?״','Later the group invited the student to speak.']
 ],
 'Promise under pressure':[
  ['“I said I would be there,” the student remembered.','״אמרתי שאהיה שם,״ נזכר התלמיד.','The student remembered the promise.'],
  ['“You can change your mind,” a friend said, “but tell me now.”','״אתה יכול לשנות את דעתך,״ אמר חבר, ״אבל ספר לי עכשיו.״','A friend asked for an honest answer.'],
  ['The new opportunity would disappear by the end of the day.','ההזדמנות החדשה הייתה נעלמת עד סוף היום.','The new opportunity had a deadline.'],
  ['“We made this plan together,” the waiting person said.','״בנינו את התכנית הזאת יחד,״ אמר האדם שהמתין.','The other person explained the cost of breaking the promise.'],
  ['The student closed the new invitation and kept the earlier promise.','התלמיד סגר את ההזמנה החדשה וקיים את ההבטחה הקודמת.','The student chose the promise over the new invitation.'],
  ['Nobody gave a speech; the action was enough.','איש לא נשא נאום; המעשה הספיק.','The action showed the choice clearly.']
 ],
 'False appearance':[
  ['“It looks clear to me,” one student said.','״זה נראה לי ברור,״ אמר תלמיד אחד.','One student trusted the first appearance.'],
  ['“Did you check the whole thing?” another asked.','״בדקת את הדבר כולו?״ שאל תלמיד אחר.','Another student asked for verification.'],
  ['They opened the original beside the copy.','הם פתחו את המקור לצד העותק.','They compared the copy with the original.'],
  ['“I was wrong,” the first student said.','״טעיתי,״ אמר התלמיד הראשון.','The student admitted the error.'],
  ['“We should correct it where everyone can see.”','״אנחנו צריכים לתקן זאת במקום שכולם יראו.״','They decided to make the correction visible.'],
  ['The next time, they paused before accepting the first version.','בפעם הבאה הם עצרו לפני שקיבלו את הגרסה הראשונה.','Later they checked before believing an appearance.']
 ],
 'Chain reaction':[
  ['“It was only one small action,” the student said.','״זאת הייתה רק פעולה קטנה אחת,״ אמר התלמיד.','The student had not expected a larger result.'],
  ['“Look what happened next,” a classmate replied.','״תראה מה קרה אחר כך,״ השיב חבר לכיתה.','A classmate pointed to the next consequence.'],
  ['They traced each result back to the first action.','הם עקבו מכל תוצאה בחזרה אל הפעולה הראשונה.','They followed the chain of events.'],
  ['“You stop this part; we will repair the other part.”','״אתה תעצור את החלק הזה; אנחנו נתקן את החלק האחר.״','They divided the repair work.'],
  ['One consequence remained even after the main problem ended.','תוצאה אחת נשארה גם לאחר שהבעיה העיקרית הסתיימה.','One effect could not be removed immediately.'],
  ['A later choice showed that they remembered the chain.','בחירה מאוחרת הראתה שהם זכרו את תגובת השרשרת.','Their later behavior showed lasting learning.']
 ],
 'Role reversal':[
  ['“I usually help everyone else,” the student said.','״אני בדרך כלל עוזר לכל האחרים,״ אמר התלמיד.','The usual helper described the normal role.'],
  ['This time, the helper was the person who became stuck.','הפעם המסייע היה האדם שנתקע.','The usual helper now needed support.'],
  ['“You can ask us too,” a classmate said.','״גם אתה יכול לבקש מאיתנו,״ אמר חבר לכיתה.','A classmate offered help to the usual helper.'],
  ['After a long pause, the student accepted one clear task from them.','לאחר הפסקה ארוכה התלמיד קיבל מהם משימה ברורה אחת.','The student finally accepted help.'],
  ['“We can do different parts,” the group agreed.','״אנחנו יכולים לעשות חלקים שונים,״ הסכימה הקבוצה.','The group shared the work.'],
  ['The next task began with nobody called only “the helper.”','המשימה הבאה התחילה בלי שאדם אחד נקרא רק ״המסייע״.','The next task used more equal roles.']
 ],
 'Moral dilemma':[
  ['“Both choices protect something important,” one person said.','״שתי האפשרויות מגנות על דבר חשוב,״ אמר אדם אחד.','One person recognized the value on both sides.'],
  ['“Then we must ask who pays the cost.”','״אז עלינו לשאול מי משלם את המחיר.״','They asked who would carry the cost.'],
  ['The easiest option protected the group making the decision.','האפשרות הקלה ביותר הגנה על הקבוצה שקיבלה את ההחלטה.','The easiest choice favored the decision makers.'],
  ['They invited the affected person to explain the missing need.','הם הזמינו את האדם שיושפע להסביר את הצורך החסר.','They listened to the person most affected.'],
  ['“We cannot remove every cost, but we can name it honestly.”','״איננו יכולים להסיר כל מחיר, אבל אנחנו יכולים לציין אותו בכנות.״','They accepted that no choice was perfect.'],
  ['The final explanation included both the reason and the sacrifice.','ההסבר הסופי כלל גם את הסיבה וגם את הוויתור.','They explained the reason and the remaining cost.']
 ],
 'Preparation pays off':[
  ['“Start with the step we practiced,” one student said.','״תתחילו בצעד שתרגלנו,״ אמר תלמיד אחד.','One student recalled the practiced first step.'],
  ['“I know my role; you check the next one.”','״אני יודע את התפקיד שלי; אתה תבדוק את הבא.״','The students used their practiced roles.'],
  ['A familiar instruction made the unexpected moment less confusing.','הנחיה מוכרת הפכה את הרגע הבלתי צפוי לפחות מבלבל.','A familiar instruction reduced confusion.'],
  ['“The practice did not feel important until now.”','״התרגול לא הרגיש חשוב עד עכשיו.״','The purpose of the practice became clear.'],
  ['They completed the difficult step without rushing.','הם השלימו את הצעד הקשה בלי למהר.','They acted carefully instead of rushing.'],
  ['Later, they practiced again and improved the weakest step.','לאחר מכן הם תרגלו שוב ושיפרו את הצעד החלש ביותר.','Later they improved the practice.']
 ]
};
function voiceBeats(s){
 const t=(s.id+' '+s.en).toLowerCase();
 if(/broken.pencil/.test(t))return[
  ['“I cannot finish the page with this broken pencil.”','״איני יכול לסיים את העמוד עם העיפרון השבור הזה.״','The student explained the immediate problem.'],
  ['“You can use mine until the lesson ends.”','״אתה יכול להשתמש בשלי עד סוף השיעור.״','A classmate offered a pencil.'],
  ['“We can sharpen the broken one at break.”','״אנחנו יכולים לחדד את השבור בהפסקה.״','They planned to repair what could be used.'],
  ['“I will return yours before you need it.”','״אחזיר לך את שלך לפני שתזדקק לו.״','The student accepted the help responsibly.']];
 if(/rainy.walk/.test(t))return[
  ['“I cannot see the crossing through this rain.”','״איני יכול לראות את מעבר החצייה דרך הגשם הזה.״','A student named the danger.'],
  ['“You stay under the shelter while I check the safer route.”','״אתה תישאר מתחת למחסה בזמן שאבדוק את הדרך הבטוחה יותר.״','The friends avoided rushing into danger.'],
  ['“We should take the longer street with the traffic lights.”','״עלינו לבחור ברחוב הארוך יותר שבו יש רמזורים.״','They chose a safer route.'],
  ['“I will call home and explain why we are late.”','״אתקשר הביתה ואסביר מדוע אנחנו מאחרים.״','A student communicated the changed plan.']];
 if(/school.map/.test(t))return[
  ['“I still cannot find the science room on this map.”','״עדיין איני מוצא את חדר המדעים במפה הזאת.״','A student identified a confusing part of the map.'],
  ['“You follow the blue line; I will test the red one.”','״אתה תעקוב אחרי הקו הכחול; אני אבדוק את האדום.״','The students tested two routes.'],
  ['“We need symbols that a new student can understand quickly.”','״אנחנו צריכים סמלים שתלמיד חדש יוכל להבין במהירות.״','The group designed for new users.'],
  ['“I will ask someone who has never used the map.”','״אבקש ממישהו שמעולם לא השתמש במפה.״','The student planned a fair test.']];
 if(/missed.practice/.test(t)&&!/screen/.test(t))return[
  ['“I should have told you why I could not come,” Lior said.','״הייתי צריך לספר לכם מדוע לא יכולתי להגיע,״ אמר ליאור.','Lior admitted that the team lacked information.'],
  ['“You could have sent one short message,” a teammate replied.','״יכולת לשלוח הודעה קצרה אחת,״ השיב חבר לקבוצה.','A teammate asked for clearer communication.'],
  ['“We were angry because we thought you had stopped caring.”','״כעסנו מפני שחשבנו שכבר לא אכפת לך.״','The teammates explained their mistaken assumption.'],
  ['“I can join an extra practice and show my commitment.”','״אני יכול להצטרף לאימון נוסף ולהראות את המחויבות שלי.״','Lior offered a responsible repair.']];
 if(/community.race|accessible.sports.day/.test(t))return[
  ['“I want a real way to take part, not a place to watch.”','״אני רוצה דרך אמיתית להשתתף, לא מקום לצפות.״','A student asked for meaningful participation.'],
  ['“You test the shorter route; I will check the activity stations.”','״אתה תבדוק את המסלול הקצר; אני אבדוק את תחנות הפעילות.״','The students tested different forms of participation.'],
  ['“We can keep the challenge and offer more than one role.”','״אנחנו יכולים לשמור על האתגר ולהציע יותר מתפקיד אחד.״','The group protected both inclusion and challenge.'],
  ['“I will ask every participant what support actually helps.”','״אשאל כל משתתף איזו תמיכה באמת עוזרת.״','The organizer chose consultation over assumption.']];
 if(/new.glasses/.test(t))return[
  ['“I know my glasses look different, but I still feel like myself.”','״אני יודע שהמשקפיים שלי נראים שונים, אבל אני עדיין מרגיש כמו עצמי.״','Ethan answered the attention directly.'],
  ['“You do not need to answer every comment,” his friend said.','״אינך חייב לענות על כל הערה,״ אמר חברו.','A friend protected Ethan’s choice.'],
  ['“We can talk about the game instead.”','״אנחנו יכולים לדבר על המשחק במקום זאת.״','The friend moved attention to an ordinary topic.'],
  ['“I will answer once, and then I want to continue my day.”','״אענה פעם אחת, ואז אני רוצה להמשיך ביום שלי.״','Ethan set a calm boundary.']];
 if(/more.than.an.appearance/.test(t))return[
  ['“I want you to judge my work after you see it.”','״אני רוצה שתשפטו את עבודתי לאחר שתראו אותה.״','The student asked to be judged by the work.'],
  ['“You noticed the difference before you noticed the idea,” a classmate admitted.','״שמת לב לשוני לפני ששמת לב לרעיון,״ הודה חבר לכיתה.','A classmate recognized an unfair first reaction.'],
  ['“We should test every design by the same rule.”','״עלינו לבדוק כל עיצוב לפי אותו כלל.״','The group chose a fair standard.'],
  ['“I will show how this part solves our problem.”','״אראה כיצד החלק הזה פותר את הבעיה שלנו.״','The student prepared to demonstrate the skill.']];
 if(/incomplete.consent/.test(t))return[
  ['“I agreed before anyone explained the possible risks.”','״הסכמתי לפני שמישהו הסביר את הסיכונים האפשריים.״','A participant described incomplete consent.'],
  ['“You must give us the full explanation before we choose.”','״עליכם לתת לנו את ההסבר המלא לפני שנבחר.״','A participant asked for complete information.'],
  ['“We should pause the study until every person can decide again.”','״עלינו לעצור את המחקר עד שכל אדם יוכל להחליט שוב.״','The group protected voluntary choice.'],
  ['“I will rewrite the form in clear language.”','״אכתוב מחדש את הטופס בשפה ברורה.״','A researcher accepted responsibility for clear consent.']];
 if(/selective.report|late.evidence|biased.selection/.test(t))return[
  ['“I found a result that the summary does not explain.”','״מצאתי תוצאה שהסיכום אינו מסביר.״','One person identified missing evidence.'],
  ['“You need to see the full evidence before you decide.”','״עליכם לראות את מלוא הראיות לפני שתחליטו.״','The group was asked to examine complete evidence.'],
  ['“We should test the same standard against every result.”','״עלינו לבדוק את אותו תקן מול כל תוצאה.״','The group chose a consistent test.'],
  ['“I will mark exactly what changed and why.”','״אסמן בדיוק מה השתנה ומדוע.״','One person promised a transparent revision.']];
 if(/conflict.interest/.test(t))return[
  ['“I need to disclose that the owner is my relative.”','״עליי לגלות שהבעלים הוא קרוב משפחה שלי.״','The member disclosed the family connection.'],
  ['“You should step out before we discuss the bids.”','״עליך לצאת לפני שנדון בהצעות.״','Another member asked for recusal.'],
  ['“We can ask an independent member to review the same evidence.”','״אנחנו יכולים לבקש מחבר עצמאי לבדוק את אותן ראיות.״','The committee protected independent review.'],
  ['“I will not vote, even if I believe I can be fair.”','״לא אצביע, גם אם אני מאמין שאוכל להיות הוגן.״','The member chose recusal over personal confidence.']];
 if(/unsafe.workplace|whistleblower/.test(t))return[
  ['“I saw the guard removed from the machine.”','״ראיתי שהמגן הוסר מן המכונה.״','A worker described the specific danger.'],
  ['“You must stop the task before someone is hurt.”','״עליכם לעצור את המשימה לפני שמישהו ייפגע.״','A worker demanded immediate prevention.'],
  ['“We reported this once; now we need a protected record.”','״דיווחנו על כך פעם אחת; עכשיו אנחנו צריכים רישום מוגן.״','The workers needed a formal protected report.'],
  ['“I will send the dated evidence through the safety channel.”','״אשלח את הראיות המתוארכות בערוץ הבטיחות.״','The worker chose the proper reporting channel.']];
 if(/recommendation.letter|scholarship.application/.test(t))return[
  ['“I want this application to show what I have truly done.”','״אני רוצה שהבקשה הזאת תראה מה באמת עשיתי.״','The student chose truthful evidence.'],
  ['“You do not need a false claim to explain a real need.”','״אינך זקוק לטענה כוזבת כדי להסביר צורך אמיתי.״','A teacher supported honest explanation.'],
  ['“We can use a specific example instead of exaggerated praise.”','״אנחנו יכולים להשתמש בדוגמה מסוימת במקום בשבח מוגזם.״','They replaced exaggeration with evidence.'],
  ['“I will remove the sentence I cannot support.”','״אסיר את המשפט שאיני יכול לתמוך בו.״','The writer removed an unsupported claim.']];
 if(/promise.to.a.friend|private.donation|missing.permission|incomplete.consent|confidential.conversation|good.intention/.test(t))return[
  ['“Did we ask before sharing this?” one person asked.','״שאלנו לפני ששיתפנו את זה?״ שאל אדם אחד.','One person asked whether permission had been given.'],
  ['“I wanted to help, but I did not ask,” another admitted.','״רציתי לעזור, אבל לא שאלתי,״ הודה אדם אחר.','Another person admitted acting without permission.'],
  ['“We can help without revealing a name or private detail.”','״אנחנו יכולים לעזור בלי לחשוף שם או פרט אישי.״','They looked for a private way to help.'],
  ['“You contact the person; I will remove the details.”','״אתה תיצור קשר עם האדם; אני אסיר את הפרטים.״','They divided the repair work.']];
 if(/accessible.trip/.test(t))return[
  ['“I want to join the trip, not wait at school,” the student said.','״אני רוצה להצטרף לטיול, לא לחכות בבית הספר,״ אמר התלמיד.','The student asked to join the trip fully.'],
  ['“You should be part of the challenge,” a classmate replied.','״אתה צריך להיות חלק מן האתגר,״ השיב חבר לכיתה.','A classmate supported full participation.'],
  ['“We need a different route, not an easier experience.”','״אנחנו צריכים מסלול אחר, לא חוויה קלה יותר.״','The group protected the trip’s value.'],
  ['“I will check the steep section with you.”','״אני אבדוק איתך את החלק התלול.״','A classmate offered practical cooperation.']];
 if(/first.job.interview/.test(t))return[
  ['“I am nervous because this is my first interview,” Noa said.','״אני לחוצה כי זה הריאיון הראשון שלי,״ אמרה נועה.','Noa admitted feeling nervous.'],
  ['“You do not need to pretend you have more experience,” a teacher replied.','״את לא צריכה להעמיד פנים שיש לך יותר ניסיון,״ השיבה מורה.','A teacher encouraged honest preparation.'],
  ['“We can practice one question at a time.”','״אנחנו יכולות לתרגל שאלה אחת בכל פעם.״','They planned gradual practice.'],
  ['“I will explain what I have learned, not invent what I have done.”','״אני אסביר מה למדתי, לא אמציא מה עשיתי.״','Noa chose an honest answer.']];
 if(/shift.exchange/.test(t))return[
  ['“I need to change my shift,” one worker said.','״אני צריך להחליף את המשמרת שלי,״ אמר עובד אחד.','A worker asked to change a shift.'],
  ['“You must tell the manager before I agree,” the other replied.','״אתה חייב לספר למנהל לפני שאסכים,״ השיב האחר.','The other worker required clear approval.'],
  ['“We need written confirmation so the shift is not left empty.”','״אנחנו צריכים אישור כתוב כדי שהמשמרת לא תישאר ריקה.״','They protected the work schedule.'],
  ['“I will send the request now and copy you.”','״אני אשלח את הבקשה עכשיו ואשלח העתק גם אליך.״','The worker agreed to communicate clearly.']];
 if(/conflict.interest|whistleblower|biased.selection|incomplete.consent|recommendation.letter|unsafe.workplace|scholarship.application|selective.report|late.evidence|confidential.conversation|friend.who.cheated|silent.witness|volunteer.truth/.test(t))return[
  ['“I need to say something before we continue.”','״אני צריך לומר משהו לפני שנמשיך.״','One person asked to speak before the process continued.'],
  ['“You should tell us now, not after the decision.”','״אתה צריך לספר לנו עכשיו, לא לאחר ההחלטה.״','Another person asked for immediate honesty.'],
  ['“We need the same rule for everyone.”','״אנחנו צריכים את אותו כלל לכולם.״','The group called for one fair rule.'],
  ['“I will put the facts in writing.”','״אני אעלה את העובדות על הכתב.״','The person agreed to create a clear record.'],
  ['“I cannot agree until the missing fact is recorded.”','״איני יכול להסכים עד שהעובדה החסרה תירשם.״','One person would not decide without a complete record.'],
  ['“You are asking us to decide without the full information.”','״אתה מבקש מאיתנו להחליט בלי המידע המלא.״','Someone named the problem with the process.'],
  ['“We should pause and apply the rule openly.”','״עלינו לעצור ולהחיל את הכלל בגלוי.״','The group chose an open process.'],
  ['“I will show you where the record and the explanation differ.”','״אראה לכם היכן הרישום וההסבר שונים.״','One person offered specific evidence.'],
  ['“I signed this statement, so I must correct it.”','״חתמתי על ההצהרה הזאת, ולכן עליי לתקן אותה.״','One person accepted responsibility for the record.'],
  ['“You may disagree, but you should see the same evidence.”','״ייתכן שלא תסכים, אך עליך לראות את אותן ראיות.״','The evidence was made available to everyone involved.'],
  ['“We can reopen the decision without hiding the earlier mistake.”','״אנחנו יכולים לפתוח מחדש את ההחלטה בלי להסתיר את הטעות הקודמת.״','The group chose honest review.'],
  ['“I will state my connection before anyone votes.”','״אצהיר על הקשר שלי לפני שמישהו יצביע.״','One person disclosed a relevant connection in time.']];
 if(/new.student|spare.seat|lunch.table|empty.seat|new.glasses|more.than.an.appearance|welcome/.test(t))return[
  ['“Can I sit here?” the student asked.','״אפשר לשבת כאן?״ שאל התלמיד.','The student asked to join.'],
  ['“Yes. You can sit with us,” a classmate replied.','״כן. אתה יכול לשבת איתנו,״ השיב חבר לכיתה.','A classmate welcomed the student.'],
  ['“I did not know how to ask,” the student admitted.','״לא ידעתי איך לשאול,״ הודה התלמיד.','The student explained the hesitation.'],
  ['“We will start together,” another voice added.','״אנחנו נתחיל יחד,״ הוסיף קול אחר.','The group included the student.']];
 if(/online.challenge/.test(t))return[
  ['“Everyone is recording it,” one student said.','״כולם מצלמים את זה,״ אמר תלמיד אחד.','One student described the online pressure.'],
  ['“You do not have to prove anything this way,” a friend replied.','״אתה לא צריך להוכיח דבר בדרך הזאת,״ השיב חבר.','A friend challenged the pressure.'],
  ['“I want to join them, but somebody could get hurt.”','״אני רוצה להצטרף אליהם, אבל מישהו עלול להיפגע.״','The student admitted the conflict.'],
  ['“We can refuse together and explain why.”','״אנחנו יכולים לסרב יחד ולהסביר מדוע.״','The friends chose to refuse together.']];
 if(/sitting.all.afternoon|week.without.movement|study.screen.balance/.test(t))return[
  ['“I have been sitting for hours,” the student said.','״אני יושב כבר שעות,״ אמר התלמיד.','The student noticed the long sitting time.'],
  ['“You need a real break, not another screen,” a friend replied.','״אתה צריך הפסקה אמיתית, לא עוד מסך,״ השיב חבר.','A friend suggested a real break.'],
  ['“We can walk for ten minutes and then return.”','״אנחנו יכולים ללכת עשר דקות ואז לחזור.״','They planned a short movement break.'],
  ['“I will set the timer so we keep our plan.”','״אני אכוון את הטיימר כדי שנעמוד בתכנית שלנו.״','The student used a timer to keep the plan.']];
 if(/class.plant|school.garden|bird.nest|class.pet|wildlife/.test(t))return[
  ['“I think it needs our help,” one student said.','״אני חושב שהוא זקוק לעזרתנו,״ אמר תלמיד אחד.','A student noticed that care was needed.'],
  ['“You check it today; I will check it tomorrow.”','״אתה תבדוק אותו היום; אני אבדוק אותו מחר.״','They shared the care over time.'],
  ['“We must watch carefully before we touch anything.”','״אנחנו חייבים להתבונן היטב לפני שניגע במשהו.״','They chose observation before action.'],
  ['“Let us record what changes each day.”','״בואו נתעד מה משתנה בכל יום.״','They planned to record the changes.']];
 if(/long.term.solution/.test(t))return[
  ['“I fixed this last month,” one person said.','״תיקנתי את זה בחודש שעבר,״ אמר אדם אחד.','One person remembered an earlier repair.'],
  ['“You repaired the result, not the cause,” another replied.','״תיקנת את התוצאה, לא את הסיבה,״ השיב אדם אחר.','Another person identified the underlying problem.'],
  ['“We need to find why it keeps happening.”','״אנחנו צריכים לגלות מדוע זה ממשיך לקרות.״','The group looked for the cause.'],
  ['“I will compare the short repair with the lasting one.”','״אני אשווה בין התיקון הקצר לבין התיקון המתמשך.״','One person agreed to compare the options.']];
 if(/shared.computer/.test(t))return[
  ['“I need the computer for work due today,” one student said.','״אני צריך את המחשב לעבודה שמוגשת היום,״ אמר תלמיד אחד.','One student explained the urgent need.'],
  ['“You have had your turn for twenty minutes,” a classmate replied.','״התור שלך נמשך כבר עשרים דקות,״ השיב חבר לכיתה.','A classmate pointed to the long turn.'],
  ['“We should list the urgent tasks before we divide the time.”','״עלינו לרשום את המשימות הדחופות לפני שנחלק את הזמן.״','The group placed urgent work first.'],
  ['“I can save the game and stop now.”','״אני יכול לשמור את המשחק ולעצור עכשיו.״','The student agreed to release the computer.']];
 if(/repair.caf/.test(t))return[
  ['“I think this lamp can still work,” one student said.','״אני חושב שהמנורה הזאת עדיין יכולה לפעול,״ אמר תלמיד אחד.','A student believed the lamp could be repaired.'],
  ['“You hold the light; I will check the loose wire,” a volunteer replied.','״אתה תחזיק את האור; אני אבדוק את החוט הרופף,״ השיב מתנדב.','The volunteer shared the repair task.'],
  ['“We can test it before we throw it away.”','״אנחנו יכולים לבדוק אותה לפני שנשליך אותה.״','They chose testing before disposal.'],
  ['“I want to learn how you found the fault.”','״אני רוצה ללמוד איך מצאת את התקלה.״','The student asked to learn the repair skill.']];
 if(/homework|project|answer|artificial|ai-|digital tool/.test(t))return[
  ['“I only wanted a quick answer,” the student said.','״רק רציתי תשובה מהירה,״ אמר התלמיד.','The student admitted wanting a shortcut.'],
  ['“Can you explain it without the screen?” the teacher asked.','״אתה יכול להסביר זאת בלי המסך?״ שאלה המורה.','The teacher asked for independent understanding.'],
  ['“You ask me one question; I will answer it myself.”','״את תשאלי אותי שאלה אחת; אני אענה עליה בעצמי.״','The student chose to answer independently.'],
  ['“We can use the tool after we understand the task.”','״אנחנו יכולים להשתמש בכלי לאחר שנבין את המשימה.״','They placed understanding before tool use.']];
 if(/screen|video|feed|phone|algorithm|attention|controls.next.hour/.test(t))return[
  ['“I will stop after this one,” the student promised.','״אני אפסיק אחרי זה,״ הבטיח התלמיד.','The student promised to stop soon.'],
  ['“You said that ten minutes ago,” a friend replied.','״אמרת את זה לפני עשר דקות,״ השיב חבר.','A friend noticed the repeated promise.'],
  ['“What can we do together instead?” someone asked.','״מה אנחנו יכולים לעשות יחד במקום זה?״ שאל מישהו.','The group looked for another activity.'],
  ['“We can put the screens away while we work.”','״אנחנו יכולים להניח את המסכים בצד בזמן שנעבוד.״','They agreed on a screen-free period.'],
  ['“I opened the app for one task and forgot the time.”','״פתחתי את היישומון למשימה אחת ושכחתי את הזמן.״','The student admitted losing track of time.'],
  ['“You choose the stopping time; I will set the alarm.”','״אתה תבחר את זמן העצירה; אני אכוון את השעון.״','The friends made the stopping point clear.'],
  ['“We can finish this part without another notification.”','״אנחנו יכולים לסיים את החלק הזה בלי התראה נוספת.״','They protected their attention.'],
  ['“I want to decide when the screen stops.”','״אני רוצה להחליט מתי המסך נעצר.״','The student took responsibility for stopping.']];
 if(/photo|headline|rumor|report|account|message|consent|evidence|image|privacy|witness/.test(t))return[
  ['“Did you open the original source?” one student asked.','״פתחת את המקור המקורי?״ שאל תלמיד אחד.','One student asked whether the source had been opened.'],
  ['“I only read the message,” another admitted.','״קראתי רק את ההודעה,״ הודה תלמיד אחר.','Another student had read only the message.'],
  ['“We should not share this yet.”','״אנחנו עדיין לא צריכים לשתף את זה.״','They decided not to share yet.'],
  ['“You check the date; I will find the full page.”','״אתה תבדוק את התאריך; אני אמצא את העמוד המלא.״','They divided the source check.'],
  ['“I believed it because so many people had shared it.”','״האמנתי לזה מפני שכל כך הרבה אנשים שיתפו את זה.״','The student explained why the claim seemed convincing.'],
  ['“You found the date I missed.”','״אתה מצאת את התאריך שאני החמצתי.״','One student recognized another student’s careful check.'],
  ['“We need the whole page before we decide.”','״אנחנו צריכים את העמוד המלא לפני שנחליט.״','The group asked for complete context.'],
  ['“I will correct the message where I posted it.”','״אתקן את ההודעה במקום שבו פרסמתי אותה.״','The student made the correction visible.']];
 if(/helmet|bicycle|scooter|ride|road/.test(t))return[
  ['“Wait for me,” one rider called.','״חכה לי,״ קרא אחד הרוכבים.','One rider asked the other to wait.'],
  ['“You need a helmet before we go,” the friend replied.','״אתה צריך קסדה לפני שנצא,״ השיב החבר.','The friend insisted on a helmet.'],
  ['“I thought the short ride was safe,” the rider admitted.','״חשבתי שהרכיבה הקצרה בטוחה,״ הודה הרוכב.','The rider admitted underestimating the risk.'],
  ['“We can walk until we have two helmets.”','״אנחנו יכולים ללכת ברגל עד שיהיו לנו שתי קסדות.״','They chose to walk until both had helmets.']];
 if(/team|captain|runner|race|missed.practice|\bsports?\b|selection|group.credit|uncredited|unequal.group|winning|athlete|championship/.test(t)&&!/emergency/.test(t))return[
  ['“Can I take this part?” one student asked.','״אני יכול לקחת את החלק הזה?״ שאל תלמיד אחד.','One student asked for a role.'],
  ['“You always choose the same people,” a teammate said.','״אתה תמיד בוחר את אותם אנשים,״ אמר חבר לקבוצה.','A teammate challenged the usual choice.'],
  ['“We need every person’s work,” another student added.','״אנחנו צריכים את העבודה של כל אדם,״ הוסיף תלמיד אחר.','The group recognized every contribution.'],
  ['“I can show you what I practiced.”','״אני יכול להראות לכם מה תרגלתי.״','The student offered a practiced skill.'],
  ['“I noticed a space that nobody is covering.”','״שמתי לב למקום שאיש אינו מכסה.״','The student noticed a useful opening.'],
  ['“You saw that before the rest of us?” the captain asked.','״אתה ראית את זה לפני כולנו?״ שאל הקפטן.','The captain noticed the student’s awareness.'],
  ['“We can change the line-up for one play.”','״אנחנו יכולים לשנות את ההרכב למהלך אחד.״','The team agreed to test a new role.'],
  ['“Let me try the role I practiced.”','״תנו לי לנסות את התפקיד שתרגלתי.״','The student asked for a real chance.']];
 if(/food|cafeteria|meal|bottle.station/.test(t))return[
  ['“I see this food left here every day,” a student said.','״אני רואה את האוכל הזה נשאר כאן בכל יום,״ אמר תלמיד.','A student noticed repeated waste.'],
  ['“You count the trays; I will weigh the food.”','״אתה תספור את המגשים; אני אשקול את האוכל.״','They divided the measurement.'],
  ['“We need a plan that does not embarrass anyone.”','״אנחנו צריכים תכנית שלא תביך אף אחד.״','They protected people’s dignity.'],
  ['“Can we offer smaller portions first?” another student asked.','״אפשר להציע תחילה מנות קטנות יותר?״ שאל תלמיד אחר.','A student suggested a practical change.']];
 if(/water|garden|waste|energy|environment|plastic|transport|river|clean|repair|convenience|reusable/.test(t)&&!/clean.transport/.test(t))return[
  ['“This is more than I expected,” one student said.','״זה יותר ממה שציפיתי,״ אמר תלמיד אחד.','A student saw that the problem was serious.'],
  ['“You count this side; I will measure the other.”','״אתה תספור בצד הזה; אני אמדוד בצד האחר.״','They divided the measurement.'],
  ['“We need facts before we suggest a change.”','״אנחנו צריכים עובדות לפני שנציע שינוי.״','The group decided to collect facts.'],
  ['“Let us show everyone what we found.”','״בואו נראה לכולם מה מצאנו.״','They prepared to share the result.'],
  ['“I found the largest pile beside this mark.”','״מצאתי את הערמה הגדולה ביותר ליד הסימון הזה.״','The student located the main problem.'],
  ['“You take the photograph; I will count the items.”','״אתה תצלם; אני אספור את הפריטים.״','The students recorded the evidence together.'],
  ['“We can test one small change for a week.”','״אנחנו יכולים לבדוק שינוי קטן אחד במשך שבוע.״','The group planned a practical trial.'],
  ['“I will bring our results to the next meeting.”','״אביא את התוצאות שלנו למפגש הבא.״','The student accepted responsibility for presenting the findings.']];
 if(/emergency|hospital|first aid|injur|safety|workplace|different.kind.of.strength/.test(t))return[
  ['“Call an adult now,” one student said.','״תקרא למבוגר עכשיו,״ אמר תלמיד אחד.','One student called for adult help.'],
  ['“You stay here; I will get help.”','״אתה תישאר כאן; אני אביא עזרה.״','They divided the emergency response.'],
  ['“My hands are shaking, but I remember the first step.”','״הידיים שלי רועדות, אבל אני זוכר את הצעד הראשון.״','The student remembered the first step despite fear.'],
  ['“We know what to do next,” the group answered.','״אנחנו יודעים מה לעשות עכשיו,״ ענתה הקבוצה.','The group followed the practiced response.']];
 if(/bus|route|classroom|notebook|library|form|application|letter|interview|job|first.bell/.test(t))return[
  ['“I think I am in the wrong place,” the student said.','״אני חושב שאני במקום הלא נכון,״ אמר התלמיד.','The student admitted being lost or confused.'],
  ['“Show me your paper,” a classmate replied.','״תראה לי את הדף שלך,״ השיב חבר לכיתה.','A classmate asked to see the information.'],
  ['“You read the number; I will check the time.”','״אתה תקרא את המספר; אני אבדוק את השעה.״','They checked the information together.'],
  ['“We found it,” they said at the correct door.','״מצאנו,״ הם אמרו ליד הדלת הנכונה.','They reached the correct place.']];
 if(/neighbor|community|public|budget|donation|volunteer|transport|park/.test(t))return[
  ['“I use this place too,” one person said.','״גם אני משתמש במקום הזה,״ אמר אדם אחד.','One person explained a personal connection.'],
  ['“What do you need from us?” another asked.','״מה אתה צריך מאיתנו?״ שאל אדם אחר.','Another person asked how to help.'],
  ['“You speak to the residents; I will write the facts.”','״אתה תדבר עם התושבים; אני אכתוב את העובדות.״','They divided the community work.'],
  ['“We can present one clear request together.”','״אנחנו יכולים להציג יחד בקשה ברורה אחת.״','They prepared a shared request.'],
  ['“I have not heard anyone from this street yet.”','״עדיין לא שמעתי אף אחד מן הרחוב הזה.״','One person noticed a missing voice.'],
  ['“You ask the people who could not attend.”','״אתה תשאל את האנשים שלא יכלו להגיע.״','The group reached beyond the meeting room.'],
  ['“We should compare need, cost, and access.”','״עלינו להשוות בין צורך, עלות ונגישות.״','The group used clear criteria.'],
  ['“I will add the missing answer to the map.”','״אוסיף את התשובה החסרה למפה.״','One person made the record more complete.'],
  ['“I walk past this problem every morning.”','״אני עובר ליד הבעיה הזאת בכל בוקר.״','A resident described direct experience.'],
  ['“You heard the meeting; now come and see the place.”','״שמעת את הישיבה; עכשיו בוא לראות את המקום.״','A resident asked for observation beyond discussion.'],
  ['“We cannot call it a shared plan if one street is missing.”','״איננו יכולים לקרוא לזה תכנית משותפת אם רחוב אחד חסר.״','The group connected representation with fairness.'],
  ['“I will bring both proposals, not only the one I prefer.”','״אביא את שתי ההצעות, לא רק את זו שאני מעדיף.״','One person promised a fair comparison.']];
 return[
  ['“I do not think this is fair,” one person said.','״אני לא חושב שזה הוגן,״ אמר אדם אחד.','One person questioned the situation.'],
  ['“What do you want us to do?” another asked.','״מה אתה רוצה שנעשה?״ שאל אדם אחר.','Another person asked for a clear action.'],
  ['“We need the facts before we decide.”','״אנחנו צריכים את העובדות לפני שנחליט.״','They agreed to check the facts.'],
  ['“You are right; I will speak clearly.”','״אתה צודק; אני אדבר בצורה ברורה.״','One person agreed to speak honestly.']];
}
function anchors(s){const n=s.scenes.length;if(s.id.startsWith('new-'))return[s.scenes[0],s.scenes[1],s.scenes[n-2],s.scenes[n-1]];return[s.scenes[0],s.scenes[Math.round((n-1)/3)],s.scenes[Math.round((n-1)*2/3)],s.scenes[n-1]]}
function details(s){
 const t=(s.id+' '+s.en).toLowerCase();
 if(/broken.pencil/.test(t))return[
  ['The pencil point had snapped close to the wood.','חוד העיפרון נשבר קרוב לעץ.','The pencil could not write clearly.'],
  ['A half-finished answer waited on the page.','תשובה שהושלמה רק בחלקה המתינה על הדף.','The broken pencil had stopped the work.'],
  ['One classmate placed a second pencil between the two notebooks.','חבר לכיתה הניח עיפרון נוסף בין שתי המחברות.','A classmate shared a pencil quietly.'],
  ['The broken pencil went into the sharpener instead of the bin.','העיפרון השבור נכנס למחדד במקום לפח.','The pencil was repaired rather than discarded.']];
 if(/rainy.walk/.test(t))return[
  ['Water covered the curb and hid the edge of the road.','מים כיסו את שפת המדרכה והסתירו את קצה הכביש.','The flooded curb made the road hard to see.'],
  ['Cars sent wide sprays across the nearest crossing.','מכוניות התיזו מים לרוחב מעבר החצייה הקרוב.','The nearest crossing was unsafe.'],
  ['The longer route had traffic lights and a covered walkway.','בדרך הארוכה יותר היו רמזורים ומעבר מקורה.','The longer route offered safer protection.'],
  ['A wet phone screen still showed the message sent home.','מסך טלפון רטוב עדיין הראה את ההודעה שנשלחה הביתה.','The students informed home about the delay.']];
 if(/school.map/.test(t))return[
  ['Two blue arrows pointed in opposite directions at the same corner.','שני חצים כחולים הצביעו לכיוונים מנוגדים באותה פינה.','The map gave conflicting directions.'],
  ['The science room number was missing from the old map.','מספר חדר המדעים היה חסר במפה הישנה.','The old map omitted an important room.'],
  ['A new student stopped where the corridor divided.','תלמיד חדש עצר במקום שבו המסדרון התפצל.','The junction revealed where guidance was needed.'],
  ['Colored symbols connected each floor with its main rooms.','סמלים צבעוניים חיברו כל קומה לחדריה המרכזיים.','The revised symbols clarified the building.']];
 if(/river.after|l2.es.river/.test(t))return[
  ['Brown foam gathered beside one drain after the storm.','קצף חום הצטבר ליד ניקוז אחד לאחר הסערה.','The foam marked a possible source.'],
  ['The students photographed the river above and below that point.','התלמידים צילמו את הנהר מעל הנקודה ומתחתיה.','The photographs allowed a useful comparison.'],
  ['A map connected the drain to a nearby work area.','מפה חיברה את הניקוז לאזור עבודה סמוך.','The map suggested where to investigate.'],
  ['A clear sample bottle stood beside the cloudy one.','בקבוק דגימה צלול עמד ליד הבקבוק העכור.','The samples showed a visible difference.']];
 if(/missed.practice/.test(t)&&!/screen/.test(t))return[
  ['The team chat showed no message beside Lior’s name.','השיחה הקבוצתית הראתה שלא הייתה הודעה ליד שמו של ליאור.','The team had received no explanation.'],
  ['His practice shoes remained beside the bag he had packed.','נעלי האימון שלו נשארו ליד התיק שארז.','Lior had intended to attend.'],
  ['A family message explained the urgent help needed at home.','הודעה משפחתית הסבירה את העזרה הדחופה שנדרשה בבית.','A real family need had changed the plan.'],
  ['The coach added one extra practice time beside Lior’s name.','המאמן הוסיף זמן אימון נוסף ליד שמו של ליאור.','The repair plan became specific.']];
 if(/community.race|accessible.sports.day/.test(t))return[
  ['The first plan offered one difficult route and no other active role.','התכנית הראשונה הציעה מסלול קשה אחד וללא תפקיד פעיל אחר.','The original event excluded some participants.'],
  ['A shorter route reached the same finish area from another direction.','מסלול קצר יותר הגיע לאותו אזור סיום מכיוון אחר.','A second route preserved the shared finish.'],
  ['Activity cards listed timing, guiding, recording, and support roles.','כרטיסי פעילות הציגו תפקידי מדידה, הכוונה, רישום ותמיכה.','The event included several meaningful roles.'],
  ['A test day revealed one narrow turn that still needed change.','יום בדיקה חשף פנייה צרה אחת שעדיין דרשה שינוי.','Testing found a remaining barrier.']];
 if(/new.glasses/.test(t))return[
  ['The new frames felt tight behind Ethan’s ears.','המסגרות החדשות לחצו מאחורי אוזניו של איתן.','Ethan was still adjusting to the glasses.'],
  ['One loud comment made several students turn toward him.','הערה קולנית אחת גרמה לכמה תלמידים להסתובב אליו.','The comment created unwanted attention.'],
  ['His friend kept the football card they had been discussing on the desk.','חברו השאיר על השולחן את כרטיס הכדורגל שעליו דיברו.','An ordinary conversation was ready to continue.'],
  ['By lunch, nobody paused when Ethan adjusted the frames.','עד ארוחת הצהריים איש לא עצר כאשר איתן סידר את המסגרת.','The glasses became an ordinary part of the day.']];
 if(/more.than.an.appearance/.test(t))return[
  ['The project table held three designs without their creators’ names.','שולחן הפרויקט הציג שלושה עיצובים ללא שמות יוצריהם.','The work could be judged without first impressions.'],
  ['One unusual-looking tool had produced the clearest model.','כלי אחד שנראה יוצא דופן יצר את הדגם הברור ביותר.','The result challenged the first assumption.'],
  ['The scoring sheet measured usefulness, clarity, and accuracy.','דף הניקוד מדד שימושיות, בהירות ודיוק.','The group used visible criteria.'],
  ['The student demonstrated the hidden feature in front of the group.','התלמיד הדגים את התכונה הנסתרת מול הקבוצה.','The ability became visible through action.']];
 if(/incomplete.consent/.test(t))return[
  ['The risk section used terms that participants had not been taught.','סעיף הסיכונים השתמש במונחים שלא הוסברו למשתתפים.','The risk explanation was not clear.'],
  ['One required consequence appeared only on the final page.','תוצאה נדרשת אחת הופיעה רק בעמוד האחרון.','Important information appeared too late.'],
  ['Several signatures had been collected before questions were invited.','כמה חתימות נאספו לפני שהוזמנו שאלות.','People signed before they could ask questions.'],
  ['The revised form placed choice, risk, and the right to stop in separate boxes.','הטופס המתוקן הציב בחירה, סיכון והזכות להפסיק במשבצות נפרדות.','The new form made each right clear.']];
 if(/selective.report|late.evidence|biased.selection/.test(t))return[
  ['One result was missing from the summary but present in the full table.','תוצאה אחת הייתה חסרה בסיכום אך הופיעה בטבלה המלאה.','The full table contained an omitted result.'],
  ['The date on the new evidence placed it before the final vote.','התאריך על הראיה החדשה הציב אותה לפני ההצבעה הסופית.','The date changed the timeline.'],
  ['The same criterion produced different patterns across two groups.','אותו קריטריון יצר דפוסים שונים בשתי קבוצות.','The outcome revealed a possible bias.'],
  ['A blank column showed which limitation the first report had hidden.','עמודה ריקה הראתה איזו מגבלה הדוח הראשון הסתיר.','The first report omitted an important limitation.']];
 if(/conflict.interest/.test(t))return[
  ['The company form carried the same family name as the committee member.','טופס החברה נשא את אותו שם משפחה כמו חבר הוועדה.','The form revealed a family connection.'],
  ['The disclosure box beside that member’s name was still empty.','משבצת הגילוי ליד שמו של אותו חבר עדיין הייתה ריקה.','The connection had not been disclosed.'],
  ['An independent reviewer waited outside the first meeting.','בודק עצמאי המתין מחוץ לישיבה הראשונה.','An independent reviewer was available.'],
  ['The minutes recorded the member’s departure before the vote.','הפרוטוקול תיעד את יציאת החבר לפני ההצבעה.','The record showed that the member did not vote.']];
 if(/unsafe.workplace|whistleblower/.test(t))return[
  ['A dated photograph showed the missing guard beside the moving part.','תצלום מתוארך הראה את המגן החסר ליד החלק הנע.','A photograph showed the exact danger.'],
  ['Two earlier warnings carried receipt marks but no repair note.','שתי אזהרות קודמות נשאו סימני קבלה אך ללא רישום תיקון.','Earlier warnings had been received but not resolved.'],
  ['The altered safety record differed from the copy saved by the worker.','רישום הבטיחות ששונה היה שונה מן העותק ששמר העובד.','The saved copy revealed an alteration.'],
  ['A protected reporting address appeared on the safety card.','כתובת דיווח מוגנת הופיעה בכרטיס הבטיחות.','The safety card provided a protected channel.']];
 if(/recommendation.letter|scholarship.application/.test(t))return[
  ['One impressive sentence had no example or document behind it.','למשפט מרשים אחד לא הייתה דוגמה או מסמך שתמכו בו.','One claim lacked evidence.'],
  ['A real project or responsibility supplied a smaller but stronger example.','פרויקט או אחריות אמיתיים סיפקו דוגמה צנועה אך חזקה יותר.','A genuine example was more credible.'],
  ['The student placed accurate documents beside the application form.','התלמיד הניח מסמכים מדויקים ליד טופס הבקשה.','The application included accurate evidence.'],
  ['The unsupported sentence was crossed out before submission.','המשפט שלא ניתן היה לתמוך בו נמחק לפני ההגשה.','The final version removed exaggeration.']];
 if(/friend.who.cheated|silent.witness|volunteer.truth/.test(t))return[
  ['One exact action had been seen, but nobody had written it down yet.','פעולה מדויקת אחת נראתה, אך איש עדיין לא כתב אותה.','Someone had seen the exact event.'],
  ['Another person was close to receiving blame or praise that was not deserved.','אדם אחר היה קרוב לקבל אשמה או שבח שלא הגיעו לו.','The silence could create unfair blame or credit.'],
  ['The student wrote the time, place, and words without adding a guess.','התלמיד כתב את השעה, המקום והמילים בלי להוסיף ניחוש.','The student recorded facts without guessing.'],
  ['The short factual note felt heavier than the long excuse.','הפתק העובדתי הקצר הרגיש כבד יותר מן התירוץ הארוך.','The factual note made the choice real.']];
 if(/promise.to.a.friend|private.donation|missing.permission|incomplete.consent|confidential.conversation|good.intention/.test(t))return[
  ['A name, photograph, or location was still visible in the shared material.','שם, תצלום או מיקום עדיין נראו בחומר ששותף.','The shared material still revealed a private detail.'],
  ['The permission line was blank or had been explained only partly.','שורת ההסכמה הייתה ריקה או הוסברה באופן חלקי בלבד.','Permission was missing or incomplete.'],
  ['The person described in the message saw it only after others had shared it.','האדם שתואר בהודעה ראה אותה רק לאחר שאחרים שיתפו אותה.','The affected person learned about the sharing too late.'],
  ['One private detail had attracted more attention than the request for help.','פרט אישי אחד משך יותר תשומת לב מן הבקשה לעזרה.','A private detail distracted from the real need.']];
 if(/online.challenge/.test(t))return[
  ['A red recording button waited under the student’s thumb.','כפתור צילום אדום המתין מתחת לאגודלו של התלמיד.','The student’s thumb rested above the recording button.'],
  ['The comments praised risk but did not show what happened afterward.','התגובות שיבחו סיכון אך לא הראו מה קרה לאחר מכן.','The comments hid the later consequences.'],
  ['One safety warning appeared below hundreds of excited reactions.','אזהרת בטיחות אחת הופיעה מתחת למאות תגובות נלהבות.','A safety warning appeared below many excited reactions.'],
  ['The student locked the screen before the camera began recording.','התלמיד נעל את המסך לפני שהמצלמה התחילה לצלם.','The student stopped before recording.']];
 if(/sitting.all.afternoon|week.without.movement|study.screen.balance/.test(t))return[
  ['The same page had remained open while the student’s shoulders became stiff.','אותו עמוד נשאר פתוח בזמן שכתפיו של התלמיד נעשו נוקשות.','The student sat so long that the shoulders became stiff.'],
  ['A timer showed how long the chair had not moved.','טיימר הראה כמה זמן הכיסא לא זז.','A timer showed the long sitting period.'],
  ['The lines in the notebook began to blur after another hour.','השורות במחברת התחילו להיטשטש לאחר שעה נוספת.','Concentration weakened after another hour.'],
  ['A short walk was marked between two study blocks.','הליכה קצרה סומנה בין שני פרקי לימוד.','The plan placed movement between study periods.']];
 if(/class.plant|school.garden/.test(t))return[
  ['One leaf had curled inward beside the dry soil.','עלה אחד התעקם פנימה ליד האדמה היבשה.','A curled leaf showed that the plant needed care.'],
  ['A wooden stick marked the water level in the soil.','מקל עץ סימן את מפלס המים באדמה.','A stick helped the students check the soil.'],
  ['The pot stood in strong afternoon sun for too many hours.','העציץ עמד בשמש חזקה אחר הצהריים במשך שעות רבות מדי.','The plant received too much strong sun.'],
  ['A small green bud remained closed near the stem.','ניצן ירוק קטן נשאר סגור ליד הגבעול.','A small bud showed possible new growth.']];
 if(/bird.nest|class.pet|wildlife/.test(t))return[
  ['A small movement near the window made everyone lower their voices.','תנועה קטנה ליד החלון גרמה לכולם להנמיך את קולם.','A small movement made the students become quiet.'],
  ['A feather, twig, or food bowl had shifted since the morning.','נוצה, ענף קטן או קערת מזון זזו מאז הבוקר.','A small object had moved since morning.'],
  ['A line on the floor showed how far the students should remain.','קו על הרצפה הראה באיזה מרחק על התלמידים להישאר.','A floor line marked a safe distance.'],
  ['The observation page contained a time but no attempt to touch the animal.','דף התצפית כלל שעה אך לא ניסיון לגעת בבעל החיים.','The record showed observation without interference.']];
 if(/long.term.solution/.test(t))return[
  ['The repair log showed the same failure on three earlier dates.','יומן התיקונים הראה את אותה תקלה בשלושה תאריכים קודמים.','The same failure appeared three times in the repair log.'],
  ['Each quick repair covered the damage without reaching its source.','כל תיקון מהיר כיסה את הנזק בלי להגיע למקורו.','The quick repairs treated only the visible result.'],
  ['The total cost of the repeated repairs exceeded the first estimate.','העלות הכוללת של התיקונים החוזרים עלתה על ההערכה הראשונה.','Repeated repairs had become expensive.'],
  ['A diagram revealed the hidden point where the failure began.','תרשים חשף את הנקודה הנסתרת שבה התחילה התקלה.','A diagram revealed the underlying cause.']];
 if(/accessible.trip/.test(t))return[
  ['The first route map ended at a steep set of steps.','מפת המסלול הראשונה הסתיימה בגרם מדרגות תלול.','The first route included a steep barrier.'],
  ['A second path was longer but reached the same viewpoint.','שביל שני היה ארוך יותר אך הגיע לאותה נקודת תצפית.','A longer path reached the same destination.'],
  ['The class measured distance, slope, rest points, and travel time.','הכיתה מדדה מרחק, שיפוע, נקודות מנוחה וזמן הליכה.','The class compared the practical demands.'],
  ['The revised map kept the difficult activity and changed only the barrier.','המפה המתוקנת שמרה על הפעילות המאתגרת ושינתה רק את המכשול.','The revised route preserved the challenge.']];
 if(/first.job.interview/.test(t))return[
  ['Noa’s practice page contained one honest example from her volunteer work.','דף התרגול של נועה כלל דוגמה כנה אחת מעבודת ההתנדבות שלה.','Noa prepared a real example from her experience.'],
  ['One answer sounded impressive but did not describe anything she had done.','תשובה אחת נשמעה מרשימה אך לא תיארה דבר שעשתה.','One impressive answer was not genuine.'],
  ['She crossed out the false sentence and wrote a shorter true one.','היא מחקה את המשפט הכוזב וכתבה משפט אמיתי וקצר יותר.','She replaced the false claim with an honest one.'],
  ['Her folder held the job description, two questions, and the correct address.','התיקייה שלה כללה את תיאור התפקיד, שתי שאלות ואת הכתובת הנכונה.','Her folder contained the information she needed.']];
 if(/shift.exchange/.test(t))return[
  ['Two names appeared beside one shift while another shift remained empty.','שני שמות הופיעו ליד משמרת אחת בעוד משמרת אחרת נשארה ריקה.','The schedule showed an unfilled shift.'],
  ['A private message contained agreement but no manager’s approval.','הודעה פרטית כללה הסכמה אך לא אישור של המנהל.','The exchange lacked formal approval.'],
  ['The time in one message differed from the time on the shared schedule.','השעה בהודעה אחת הייתה שונה מן השעה בלוח המשותף.','The two records showed different times.'],
  ['A confirmation mark appeared only after all three people had replied.','סימן אישור הופיע רק לאחר שכל שלושת האנשים השיבו.','The exchange became clear after every person confirmed.']];
 if(/shared.computer/.test(t))return[
  ['A sign-up sheet beside the keyboard showed three waiting names.','דף הרשמה ליד המקלדת הראה שלושה שמות ממתינים.','Three students were waiting for the computer.'],
  ['One assignment carried today’s deadline while another task could wait.','על מטלה אחת הופיע מועד ההגשה של היום, בעוד משימה אחרת יכלה להמתין.','One task was more urgent than another.'],
  ['An unfinished game remained open behind the school document.','משחק שלא הסתיים נשאר פתוח מאחורי מסמך בית הספר.','A game was using time needed for schoolwork.'],
  ['A small timer stood where every user could see it.','טיימר קטן עמד במקום שכל משתמש יכול היה לראותו.','A visible timer made each turn clear.']];
 if(/conflict.interest|whistleblower|biased.selection|incomplete.consent|recommendation.letter|unsafe.workplace|scholarship.application|selective.report|late.evidence|confidential.conversation/.test(t))return[
  ['One line in the record did not match the explanation given aloud.','שורה אחת ברישום לא התאימה להסבר שנמסר בעל פה.','One written detail did not match the spoken explanation.'],
  ['A name or connection had been left out of the first document.','שם או קשר הושמטו מן המסמך הראשון.','The first document omitted an important connection.'],
  ['The folder remained open while everyone read the same evidence.','התיקייה נשארה פתוחה בזמן שכולם קראו את אותן ראיות.','Everyone examined the same evidence.'],
  ['One empty box on the checklist showed what had not been disclosed.','משבצת ריקה אחת ברשימת הבדיקה הראתה מה לא נחשף.','An empty checklist box showed what was missing.'],
  ['The time on the message proved that the warning had arrived before the decision.','השעה על ההודעה הוכיחה שהאזהרה הגיעה לפני ההחלטה.','The message time clarified the order of events.'],
  ['A signed statement identified who had accepted responsibility for the information.','הצהרה חתומה זיהתה מי קיבל אחריות למידע.','A signature made responsibility clear.'],
  ['The revised table applied the same criterion beside every name.','הטבלה המתוקנת החילה את אותו קריטריון ליד כל שם.','The revised table used one standard for everyone.'],
  ['A dated photograph showed the condition that the first report had omitted.','תצלום מתוארך הראה את המצב שהדוח הראשון השמיט.','A dated photograph supplied missing evidence.']];
 if(/food.project|food.waste|cafeteria|meal/.test(t))return[
  ['Several trays returned with bread and fruit still untouched.','כמה מגשים חזרו כשעליהם לחם ופירות שלא נגעו בהם.','Several trays returned with untouched food.'],
  ['A small scale showed how much food was discarded after one lunch.','משקל קטן הראה כמה מזון הושלך לאחר ארוחת צהריים אחת.','A scale measured one lunch period’s waste.'],
  ['Three portion sizes were marked with different colored cards.','שלושה גדלים של מנות סומנו בכרטיסים בצבעים שונים.','Colored cards marked three portion sizes.'],
  ['A sealed box waited beside a label with the collection time.','קופסה סגורה המתינה ליד תווית שעליה שעת האיסוף.','A sealed donation box showed its collection time.']];
 if(/community.survey|public.meeting|limited.community.budget|neighborhood.plan|clean.transport|new.bus.route|neighborhood.park|community.library|weekend.volunteer/.test(t))return[
  ['A map on the table showed one street or group with no mark at all.','מפה שעל השולחן הראתה רחוב או קבוצה ללא סימון כלל.','A map showed an area that had not been represented.'],
  ['The speaking list contained several familiar names and no new ones.','רשימת הדוברים כללה כמה שמות מוכרים ואף שם חדש.','The speaking list repeated the same voices.'],
  ['One student wrote two different needs in separate columns.','תלמיד אחד כתב שני צרכים שונים בעמודות נפרדות.','A student recorded two competing needs.'],
  ['The cost beside one attractive idea changed the discussion.','העלות שנרשמה ליד רעיון מושך אחד שינתה את הדיון.','The cost of one attractive idea changed the discussion.'],
  ['One handwritten comment came from a resident who could not attend.','הערה אחת בכתב יד הגיעה מתושב שלא יכול היה להשתתף.','A missing resident contributed in writing.'],
  ['Two pins marked the homes farthest from the proposed service.','שתי סיכות סימנו את הבתים הרחוקים ביותר מן השירות המוצע.','The map revealed who faced the longest distance.'],
  ['The access column was still blank beside the most popular proposal.','עמודת הנגישות עדיין הייתה ריקה ליד ההצעה הפופולרית ביותר.','The popular proposal lacked access information.'],
  ['The meeting clock reached its limit before the final speaker’s turn.','שעון הישיבה הגיע לסיומו לפני תורו של הדובר האחרון.','The final speaker had not been heard.']];
 if(/group.credit|uncredited.idea|unequal.group|perfect.project/.test(t))return[
  ['The project sheet listed names but did not show who had completed each task.','דף הפרויקט הציג שמות אך לא הראה מי ביצע כל משימה.','The project sheet did not connect names with tasks.'],
  ['One section contained corrections in the quiet student’s handwriting.','חלק אחד כלל תיקונים בכתב ידו של התלמיד השקט.','The quiet student’s handwriting appeared in the corrections.'],
  ['The shared document history showed who had worked after everyone left.','היסטוריית המסמך המשותף הראתה מי עבד לאחר שכולם עזבו.','The document history showed hidden work.'],
  ['A useful idea appeared on the final poster without its writer’s name.','רעיון מועיל הופיע בכרזה הסופית ללא שם הכותב.','The final poster omitted the idea’s author.']];
 if(/new.student|spare.seat|lunch.table|empty.seat|new.glasses|more.than.an.appearance|welcome|helping.neighbor/.test(t))return[
  ['An empty chair stood beside the noisiest table in the room.','כיסא ריק עמד ליד השולחן הרועש ביותר בחדר.','An empty chair stood beside a busy table.'],
  ['The new student held a lunch box but did not open it.','התלמיד החדש החזיק קופסת אוכל אך לא פתח אותה.','The new student held a closed lunch box.'],
  ['A classmate pulled the empty chair back and pointed to it.','חבר לכיתה משך את הכיסא הריק לאחור והצביע עליו.','A classmate pulled out the empty chair.'],
  ['The first smile appeared when somebody made room at the table.','החיוך הראשון הופיע כאשר מישהו פינה מקום ליד השולחן.','The new student smiled when someone made room.']];
 if(/helmet|bicycle|scooter|ride/.test(t))return[
  ['The loose strap tapped against the handlebar as the wheels moved.','הרצועה הרופפת טפחה על הכידון בזמן שהגלגלים נעו.','The loose strap hit the handlebar while the rider moved.'],
  ['The sudden sound of the brake made nearby students turn around.','קול הבלימה הפתאומי גרם לתלמידים סמוכים להסתובב.','Nearby students turned when they heard the brake.'],
  ['For several seconds, the rider’s hands would not stop shaking.','במשך כמה שניות ידיו של הרוכב לא הפסיקו לרעוד.','The rider’s hands shook for several seconds.'],
  ['The unused helmet felt heavier when it was lifted from the ground.','הקסדה שלא נחבשה הרגישה כבדה יותר כאשר הורמה מן הקרקע.','The unworn helmet felt heavy after the fall.']];
 if(/screen|video|feed|phone|algorithm|attention|controls.next.hour|missed.practice.screen/.test(t))return[
  ['The clock advanced while the original task remained untouched.','השעון התקדם בזמן שהמשימה המקורית נותרה ללא מגע.','Time passed while the task did not move forward.'],
  ['Three notifications appeared before the student finished one sentence.','שלוש התראות הופיעו לפני שהתלמיד סיים משפט אחד.','Notifications interrupted a single sentence.'],
  ['The student’s thumb returned to the same icon without a conscious decision.','אגודלו של התלמיד חזר לאותו סמל בלי החלטה מודעת.','The student reopened the app automatically.'],
  ['The stopping time was written beside the start time.','זמן העצירה נכתב ליד זמן ההתחלה.','The plan included a clear stopping point.'],
  ['The phone rested beyond reach while the next task was completed.','הטלפון נח מחוץ להישג יד בזמן שהמשימה הבאה הושלמה.','The phone stayed away during focused work.'],
  ['The autoplay switch changed from bright to gray.','מתג ההפעלה האוטומטית השתנה מבהיר לאפור.','The student turned autoplay off.'],
  ['A short alarm sounded before another item could begin.','התראה קצרה נשמעה לפני שפריט נוסף יכול היה להתחיל.','The alarm stopped the automatic sequence.'],
  ['The final minutes belonged to the student’s chosen activity, not the feed.','הדקות האחרונות השתייכו לפעילות שהתלמיד בחר, לא לעדכונים.','The student chose how to use the remaining time.']];
 if(/clean.playground|reusable.bottle|repair.caf|energy.audit|cost.of.convenience|clean.transport/.test(t))return[
  ['The first count gave the group a clear starting point.','הספירה הראשונה נתנה לקבוצה נקודת התחלה ברורה.','The group recorded a starting measurement.'],
  ['Reusable, repairable, and disposable items were placed in separate groups.','פריטים לשימוש חוזר, לתיקון ולהשלכה הונחו בקבוצות נפרדות.','The students sorted the available choices.'],
  ['One easy-looking option created a new cost somewhere else.','אפשרות אחת שנראתה קלה יצרה עלות חדשה במקום אחר.','The simple option had a hidden cost.'],
  ['A one-week test made the difference visible.','בדיקה של שבוע אחד הפכה את ההבדל לברור.','A short test produced visible evidence.'],
  ['The comparison included cost, effort, access, and future waste.','ההשוואה כללה עלות, מאמץ, נגישות ופסולת עתידית.','The comparison considered several practical effects.'],
  ['A repaired or reusable item stayed in service instead of being replaced.','פריט מתוקן או לשימוש חוזר נשאר בשימוש במקום להיות מוחלף.','A usable item avoided unnecessary replacement.'],
  ['The second count showed which small change had worked.','הספירה השנייה הראתה איזה שינוי קטן הצליח.','The later measurement identified the useful change.'],
  ['The results remained visible so the routine could continue.','התוצאות נשארו גלויות כדי שההרגל יוכל להימשך.','The visible results supported continued action.']];
 if(/screen|video|feed|phone|algorithm|digital tool|homework|project|answer|attention|controls.next.hour/.test(t))return[
  ['The blue light of the screen remained on long after the room became quiet.','האור הכחול של המסך נשאר דולק זמן רב לאחר שהחדר השתתק.','The screen stayed bright in the quiet room.'],
  ['One unfamiliar word appeared twice, but the student did not look it up.','מילה לא מוכרת אחת הופיעה פעמיים, אך התלמיד לא בדק אותה.','The student ignored a word that appeared twice.'],
  ['A blinking cursor waited beside a sentence the student could not explain.','סמן מהבהב המתין ליד משפט שהתלמיד לא ידע להסביר.','The cursor waited beside a sentence the student did not understand.'],
  ['When a direct question was asked, the prepared answer suddenly seemed useless.','כאשר נשאלה שאלה ישירה, התשובה המוכנה נראתה לפתע חסרת תועלת.','A direct question made the prepared answer useless.']];
 if(/photo|headline|rumor|report|account|message|consent|evidence|image/.test(t))return[
  ['A cropped edge and a missing date were visible on the screen.','קצה חתוך ותאריך חסר נראו על המסך.','The screen showed a cropped edge and no date.'],
  ['The number of shares increased before anybody opened the original source.','מספר השיתופים גדל לפני שמישהו פתח את המקור המקורי.','People shared the claim before opening its source.'],
  ['One student enlarged the smallest detail instead of reading the loudest caption.','תלמיד אחד הגדיל את הפרט הקטן ביותר במקום לקרוא את הכיתוב הבולט ביותר.','One student studied a small detail instead of the dramatic caption.'],
  ['The correction looked much quieter than the claim it replaced.','התיקון נראה שקט בהרבה מן הטענה שהחליף.','The correction attracted less attention than the original claim.'],
  ['The original page included a paragraph missing from the forwarded message.','העמוד המקורי כלל פסקה שהייתה חסרה בהודעה שהועברה.','The forwarded message omitted important context.'],
  ['A reverse search connected the picture to an older, unrelated event.','חיפוש תמונה הפוך קישר את התמונה לאירוע ישן ולא קשור.','The picture came from a different event.'],
  ['The account had changed its name twice during the same week.','החשבון שינה את שמו פעמיים באותו שבוע.','The account’s identity was unstable.'],
  ['A trusted report used the same fact but explained its limits.','דיווח אמין השתמש באותה עובדה אך הסביר את מגבלותיה.','A reliable source added necessary limits.']];
 if(/team|group|credit|captain|runner|race|missed.practice|selection|sports|winning|athlete|championship/.test(t)&&!/emergency/.test(t))return[
  ['One name remained alone at the bottom of the line-up.','שם אחד נשאר לבדו בתחתית רשימת ההרכב.','One name remained alone at the bottom of the line-up.'],
  ['The same two names were circled again before anyone discussed the new task.','אותם שני שמות הוקפו שוב לפני שמישהו דן במשימה החדשה.','The same two people were chosen again without discussion.'],
  ['An unused practice bib lay beside the student who had trained all week.','אפודת אימון שלא נעשה בה שימוש הייתה מונחת ליד התלמיד שהתאמן כל השבוע.','An unused bib lay beside a student who had practiced.'],
  ['The notes still showed who had corrected the plan after the others left.','הרשימות עדיין הראו מי תיקן את התכנית לאחר שהאחרים עזבו.','The notes revealed the hidden contribution.'],
  ['A quiet player pointed to an open space on the tactics board.','שחקן שקט הצביע על מקום פנוי בלוח הטקטיקה.','A quiet player noticed an open space.'],
  ['The ball rolled through the position that nobody had been assigned to cover.','הכדור התגלגל דרך העמדה שאיש לא שובץ לכסות.','The unfilled position became visible during play.'],
  ['The practice chart showed steady improvement beside a name the captain had skipped.','טבלת האימונים הראתה שיפור עקבי ליד שם שהקפטן דילג עליו.','The chart showed the overlooked player’s progress.'],
  ['The captain turned the tactics board so that the whole team could study it.','הקפטן סובב את לוח הטקטיקה כדי שכל הקבוצה תוכל לבחון אותו.','The whole team examined the plan together.']];
 if(/water|garden|waste|energy|environment|plastic|transport/.test(t))return[
  ['A dark mark showed where the water or waste had collected each day.','סימן כהה הראה היכן הצטברו המים או הפסולת בכל יום.','A dark mark showed where the daily problem collected.'],
  ['The students counted the amount instead of describing it as “a lot.”','התלמידים ספרו את הכמות במקום לתאר אותה כ״הרבה״.','The students measured the problem instead of guessing.'],
  ['A simple map revealed that one small area caused most of the difficulty.','מפה פשוטה חשפה שאזור קטן אחד גרם לרוב הקושי.','A map showed that one place caused most of the problem.'],
  ['The first visible improvement appeared beside the mark they had recorded.','השיפור הנראה הראשון הופיע ליד הסימן שתיעדו.','The first improvement appeared beside the recorded mark.'],
  ['Three full bags stood beside one nearly empty recycling bin.','שלוש שקיות מלאות עמדו ליד מכל מחזור כמעט ריק.','The bags and bin revealed a problem with sorting.'],
  ['A photograph from Monday made Friday’s change easy to see.','תצלום מיום שני הקל לראות את השינוי ביום שישי.','Two photographs showed the week’s change.'],
  ['Colored marks separated what could be reused from what had to be removed.','סימונים צבעוניים הפרידו בין מה שניתן לשימוש חוזר לבין מה שהיה צריך לסלק.','The marks separated reusable and unusable material.'],
  ['One small test area changed while the rest stayed untouched for comparison.','אזור בדיקה קטן אחד השתנה בזמן שהשאר נשאר ללא שינוי לצורך השוואה.','A small test made the result easier to judge.']];
 if(/emergency|hospital|first aid|injur|safety|workplace|different.kind.of.strength/.test(t))return[
  ['The alarm or warning sound cut through the ordinary noise.','צליל האזהרה חתך את הרעש הרגיל.','A warning sound interrupted the normal noise.'],
  ['Somebody’s breathing became faster while others stepped back.','נשימתו של מישהו נעשתה מהירה יותר בזמן שהאחרים נסוגו.','One person breathed faster as others moved away.'],
  ['A calm voice repeated one clear instruction.','קול רגוע חזר על הוראה ברורה אחת.','A calm voice gave one clear instruction.'],
  ['The practiced step felt different when a real person depended on it.','הצעד שתורגל הרגיש שונה כאשר אדם אמיתי היה תלוי בו.','Practice felt different when a real person needed help.']];
 if(/bus|route|classroom|school|notebook|library|form|application|letter/.test(t))return[
  ['A folded page carried several marks that had not made sense earlier.','דף מקופל נשא כמה סימנים שלא היו מובנים קודם לכן.','A folded page contained confusing marks.'],
  ['The room or stop number was almost the same as the correct one.','מספר הכיתה או התחנה היה כמעט זהה למספר הנכון.','The wrong number looked almost like the correct one.'],
  ['The bell, door, or announcement arrived before the student felt ready.','הצלצול, הדלת או ההודעה הגיעו לפני שהתלמיד הרגיש מוכן.','The next signal came before the student felt ready.'],
  ['A pencil line connected the missing information to the correct place.','קו עיפרון חיבר את המידע החסר למקום הנכון.','A pencil line connected the missing information.']];
 return[
  ['One person kept returning to the same small detail.','אדם אחד חזר שוב ושוב אל אותו פרט קטן.','One person kept examining the same detail.'],
  ['Another person moved closer and asked what was wrong.','אדם אחר התקרב ושאל מה לא בסדר.','Another person asked about the problem.'],
  ['The first answer came too quickly and stopped halfway.','התשובה הראשונה נאמרה מהר מדי ונעצרה באמצע.','The first answer stopped halfway.'],
  ['Nobody looked away when the real difficulty became clear.','איש לא הסיט את מבטו כאשר הקושי האמיתי התבהר.','Everyone stayed when the real problem became clear.']];
}
function concreteFollow(s){
 const t=(s.id+' '+s.en).toLowerCase();
 if(/broken.pencil/.test(t))return[
  ['The classmate slid a spare pencil across the desk without interrupting the lesson.','החבר לכיתה החליק עיפרון נוסף על השולחן בלי להפריע לשיעור.','The help was quiet and immediate.'],
  ['The student finished the next line and returned the pencil.','התלמיד סיים את השורה הבאה והחזיר את העיפרון.','The borrowed pencil was returned promptly.'],
  ['At break, they sharpened the broken pencil together.','בהפסקה הם חידדו יחד את העיפרון השבור.','They repaired the original pencil.'],
  ['A small crack remained, but the pencil wrote again.','סדק קטן נשאר, אך העיפרון כתב שוב.','The repair was useful though imperfect.'],
  ['The student wrote a name on each pencil in the case.','התלמיד כתב שם על כל עיפרון בקלמר.','Labeling made later care easier.'],
  ['A second spare pencil was placed in the shared classroom box.','עיפרון נוסף הונח בקופסה הכיתתית המשותפת.','The class prepared help for another student.'],
  ['The next broken point caused no panic or blame.','החוד השבור הבא לא גרם לבהלה או להאשמה.','The class handled the next problem calmly.'],
  ['A simple object had become a remembered act of kindness.','חפץ פשוט נעשה למעשה חסד שנזכר.','The small help carried a lasting lesson.']];
 if(/rainy.walk/.test(t))return[
  ['The students waited until the traffic light and road edge were visible.','התלמידים המתינו עד שהרמזור וקצה הכביש נראו.','They did not enter the road blindly.'],
  ['They sent one clear message home before changing direction.','הם שלחו הודעה ברורה אחת הביתה לפני ששינו כיוון.','Home knew about the safer plan.'],
  ['The friends walked together along the covered route.','החברים הלכו יחד בדרך המקורה.','Nobody hurried ahead alone.'],
  ['At each crossing, they stopped behind the curb.','בכל מעבר הם עצרו מאחורי שפת המדרכה.','They used the safe crossing habit.'],
  ['The longer route added ten minutes but avoided the flooded road.','הדרך הארוכה הוסיפה עשר דקות אך נמנעה מן הכביש המוצף.','Safety cost time but prevented risk.'],
  ['A parent replied that arriving late was better than crossing unsafely.','הורה השיב שעדיף להגיע מאוחר מלחצות בצורה לא בטוחה.','The adult supported the safe choice.'],
  ['Their wet shoes reached home without an accident.','נעליהם הרטובות הגיעו הביתה בלי תאונה.','The friends arrived safely.'],
  ['On the next rainy day, they chose the covered route immediately.','ביום הגשום הבא הם בחרו מיד בדרך המקורה.','The safe lesson lasted.']];
 if(/school.map/.test(t))return[
  ['Pairs walked the corridors using only the old map.','זוגות הלכו במסדרונות תוך שימוש במפה הישנה בלבד.','The class tested the old map in practice.'],
  ['They marked every corner where a direction became unclear.','הם סימנו כל פינה שבה הכיוון נעשה לא ברור.','The confusing points were recorded.'],
  ['Room numbers and floor colors were added beside simple symbols.','מספרי חדרים וצבעי קומות נוספו ליד סמלים פשוטים.','The new map used several clear clues.'],
  ['A student unfamiliar with the building tested the revised route.','תלמיד שלא הכיר את הבניין בדק את המסלול המתוקן.','A new user tested the map.'],
  ['The student reached the science room without being led there.','התלמיד הגיע לחדר המדעים בלי שמישהו הוביל אותו.','The map worked independently.'],
  ['One remaining confusing arrow was turned in the correct direction.','חץ מבלבל אחד שנותר הופנה לכיוון הנכון.','The final test found one more repair.'],
  ['Copies were placed near the entrance and on every floor.','עותקים הונחו ליד הכניסה ובכל קומה.','The map became available where needed.'],
  ['Later visitors paused less often at the divided corridor.','מבקרים מאוחרים עצרו פחות פעמים במסדרון המתפצל.','The clearer map improved navigation.']];
 if(/river.after|l2.es.river/.test(t))return[
  ['The students compared photographs and samples from both sides of the drain.','התלמידים השוו תצלומים ודגימות משני צדי הניקוז.','The comparison narrowed the source.'],
  ['They asked an environmental adult to check their method before making a claim.','הם ביקשו ממבוגר בתחום הסביבה לבדוק את שיטתם לפני שטענו טענה.','An expert checked the investigation.'],
  ['The map led them to material left uncovered near the work area.','המפה הובילה אותם לחומר שנותר לא מכוסה ליד אזור העבודה.','The map connected the storm water to the material.'],
  ['The responsible people covered the material and cleared the drain safely.','האחראים כיסו את החומר וניקו את הניקוז בבטחה.','The likely source was addressed.'],
  ['After the next rain, the students collected samples at the same points.','לאחר הגשם הבא התלמידים אספו דגימות באותן נקודות.','The class repeated the test.'],
  ['The lower sample was clearer, though the river had not recovered completely.','הדגימה התחתונה הייתה צלולה יותר, אף שהנהר לא התאושש לחלוטין.','The result improved but was not perfect.'],
  ['Their report separated observation, explanation, and remaining uncertainty.','הדוח שלהם הפריד בין תצפית, הסבר ואי־ודאות שנותרה.','The report stayed careful and honest.'],
  ['The drain remained on the class monitoring map for future storms.','הניקוז נשאר במפת המעקב הכיתתית לסערות עתידיות.','The students continued responsible monitoring.']];
 if(/missed.practice/.test(t)&&!/screen/.test(t))return[
  ['Lior showed the team the family message instead of offering a vague excuse.','ליאור הראה לקבוצה את ההודעה המשפחתית במקום להציע תירוץ מעורפל.','Lior explained the real reason.'],
  ['His teammates admitted that they had assumed he no longer cared.','חבריו לקבוצה הודו שהניחו שכבר לא אכפת לו.','The team recognized its mistaken assumption.'],
  ['Lior also admitted that one short message would have prevented the anger.','ליאור הודה גם שהודעה קצרה אחת הייתה מונעת את הכעס.','He accepted responsibility for communication.'],
  ['The coach arranged an extra practice without erasing the missed session.','המאמן קבע אימון נוסף בלי למחוק את האימון שהוחמץ.','The repair kept a fair consequence.'],
  ['A teammate stayed to practice the difficult move with him.','חבר לקבוצה נשאר לתרגל איתו את המהלך הקשה.','Support replaced blame.'],
  ['Lior completed the extra practice and updated the team chat.','ליאור השלים את האימון הנוסף ועדכן את השיחה הקבוצתית.','He followed through visibly.'],
  ['The next absence message included a reason and a plan.','הודעת ההיעדרות הבאה כללה סיבה ותכנית.','Later communication became clearer.'],
  ['Trust returned through explanation, effort, and action.','האמון חזר באמצעות הסבר, מאמץ ופעולה.','The team repaired trust together.']];
 if(/community.race|accessible.sports.day/.test(t))return[
  ['The organizers tested both routes with the people who would use them.','המארגנים בדקו את שני המסלולים עם האנשים שישתמשו בהם.','Participants helped test the design.'],
  ['They widened one turn and moved a station away from the steepest ground.','הם הרחיבו פנייה אחת והרחיקו תחנה מן הקרקע התלולה ביותר.','Testing led to a practical change.'],
  ['Every participant selected a challenging route or an active event role.','כל משתתף בחר מסלול מאתגר או תפקיד פעיל באירוע.','Everyone received meaningful participation.'],
  ['Timing and support roles counted toward the same shared goal.','תפקידי מדידה ותמיכה תרמו לאותה מטרה משותפת.','Different roles carried real value.'],
  ['The finish area brought all routes and roles back together.','אזור הסיום חיבר מחדש את כל המסלולים והתפקידים.','The event remained shared.'],
  ['More students joined than under the original one-route plan.','יותר תלמידים הצטרפו מאשר בתכנית המקורית בעלת המסלול היחיד.','The redesigned event increased participation.'],
  ['The organizers recorded which supports helped and which barriers remained.','המארגנים תיעדו אילו התאמות עזרו ואילו מכשולים נשארו.','The event ended with useful evidence.'],
  ['The next event began with participant voices at the planning table.','האירוע הבא התחיל בקולות המשתתפים ליד שולחן התכנון.','Later inclusion began during design.']];
 if(/new.glasses/.test(t))return[
  ['Ethan answered the first comment in one calm sentence.','איתן ענה על ההערה הראשונה במשפט רגוע אחד.','Ethan responded without hiding.'],
  ['His friend changed the subject back to the football card on the desk.','חברו החזיר את הנושא לכרטיס הכדורגל שעל השולחן.','The friend ended the unwanted attention.'],
  ['Another student apologized instead of asking Ethan to laugh along.','תלמיד אחר התנצל במקום לבקש מאיתן לצחוק עם כולם.','The classmate took responsibility.'],
  ['Ethan adjusted the frames and continued the lesson.','איתן סידר את המסגרת והמשיך בשיעור.','He returned to the ordinary day.'],
  ['Nobody touched the glasses or demanded to try them.','איש לא נגע במשקפיים ולא דרש לנסות אותם.','The class respected Ethan’s boundary.'],
  ['At lunch, Ethan spoke first about the game.','בארוחת הצהריים איתן דיבר ראשון על המשחק.','Ethan chose the topic.'],
  ['The frames stopped being the center of the conversation.','המסגרת חדלה להיות מרכז השיחה.','The unwanted attention faded.'],
  ['The next visible difference received curiosity without ridicule.','השוני הבולט הבא קיבל סקרנות בלי לעג.','The class carried the lesson forward.']];
 if(/more.than.an.appearance/.test(t))return[
  ['The group covered the creators’ names and scored each design by the same criteria.','הקבוצה כיסתה את שמות היוצרים וניקדה כל עיצוב לפי אותם קריטריונים.','The first review focused on the work.'],
  ['The unusual design received the highest usefulness score.','העיצוב יוצא הדופן קיבל את ציון השימושיות הגבוה ביותר.','The result challenged the first impression.'],
  ['The student demonstrated how its hidden feature solved the project problem.','התלמיד הדגים כיצד התכונה הנסתרת פתרה את בעיית הפרויקט.','The skill became visible through action.'],
  ['A classmate admitted judging the creator before studying the work.','חבר לכיתה הודה ששפט את היוצר לפני שבחן את העבודה.','The classmate named the unfair assumption.'],
  ['The group revised its choice without offering empty praise.','הקבוצה תיקנה את בחירתה בלי להציע שבח ריק.','The correction rested on evidence.'],
  ['The student explained one weakness in the design as well as its strength.','התלמיד הסביר חולשה אחת בעיצוב לצד חוזקתו.','The demonstration remained honest.'],
  ['The final presentation named the contribution clearly.','המצגת הסופית ציינה את התרומה בבירור.','The student received fair recognition.'],
  ['Later projects began with criteria before creators’ names.','פרויקטים מאוחרים התחילו בקריטריונים לפני שמות היוצרים.','The fair review method lasted.']];
 if(/more.than.an.appearance|empty.seat|spare.seat|new.glasses|lunch.table/.test(t))return[
  ['A classmate invited the quiet student into one real part of the activity.','חבר לכיתה הזמין את התלמיד השקט לחלק ממשי אחד בפעילות.','The invitation included a meaningful role.'],
  ['The student answered in a short voice but stayed instead of leaving.','התלמיד ענה בקול שקט אך נשאר במקום לעזוב.','The student accepted the first opening.'],
  ['Nobody demanded a personal explanation in front of the group.','איש לא דרש הסבר אישי מול הקבוצה.','The classmates protected privacy.'],
  ['A chair, task, or place was kept open without making a public show.','כיסא, משימה או מקום נשמרו פנויים בלי לעשות מכך הצגה פומבית.','The invitation remained available and respectful.'],
  ['The student contributed an observation the others had missed.','התלמיד תרם הבחנה שהאחרים החמיצו.','The group benefited from the student’s contribution.'],
  ['One classmate listened without interrupting or speaking for the student.','חבר אחד לכיתה הקשיב בלי להפריע ובלי לדבר בשם התלמיד.','The classmate allowed an independent voice.'],
  ['The next meeting began with roles offered before assumptions were made.','המפגש הבא התחיל בהצעת תפקידים לפני שנעשו הנחות.','Later inclusion began earlier.'],
  ['The place no longer felt borrowed by the end of the week.','עד סוף השבוע המקום כבר לא הרגיש מושאל.','The student developed a real sense of belonging.']];
 if(/incomplete.consent/.test(t))return[
  ['The researchers paused participation before collecting anything new.','החוקרים עצרו את ההשתתפות לפני שאספו דבר חדש.','The study paused immediately.'],
  ['They explained the purpose, risks, choices, and right to leave in plain language.','הם הסבירו את המטרה, הסיכונים, הבחירות והזכות לעזוב בשפה פשוטה.','The full explanation became clear.'],
  ['Participants asked questions without a researcher standing over them.','המשתתפים שאלו שאלות בלי שחוקר עמד מעליהם.','Participants received room to ask freely.'],
  ['Each person received time to decide again.','כל אדם קיבל זמן להחליט מחדש.','The renewed choice was not rushed.'],
  ['Several people continued, while others left without penalty.','כמה אנשים המשיכו ואחרים עזבו ללא עונש.','The right to refuse was real.'],
  ['Only the new voluntary signatures were accepted.','רק החתימות החדשות שניתנו מרצון התקבלו.','Only renewed consent was valid.'],
  ['The study record described exactly why the process had paused.','רישום המחקר תיאר בדיוק מדוע התהליך נעצר.','The correction remained transparent.'],
  ['Every later explanation began before the signature page.','כל הסבר מאוחר יותר התחיל לפני עמוד החתימה.','Later consent began with information.']];
 if(/selective.report|late.evidence|biased.selection/.test(t))return[
  ['The group opened the complete table beside the earlier summary.','הקבוצה פתחה את הטבלה המלאה לצד הסיכום הקודם.','They compared the complete and incomplete versions.'],
  ['They marked omitted results, dates, and affected groups in separate colors.','הם סימנו תוצאות שהושמטו, תאריכים וקבוצות מושפעות בצבעים נפרדים.','The missing evidence became visible.'],
  ['The original conclusion was tested again with the full evidence.','המסקנה המקורית נבדקה שוב עם מלוא הראיות.','The group reviewed the conclusion fairly.'],
  ['One strong claim weakened when the hidden limitation returned.','טענה חזקה אחת נחלשה כאשר המגבלה שהוסתרה חזרה.','The complete evidence changed the claim.'],
  ['The criteria were applied to every result or applicant in the same way.','הקריטריונים הוחלו על כל תוצאה או מועמד באותה דרך.','The review used a consistent standard.'],
  ['The revised decision named both the change and its reason.','ההחלטה המתוקנת ציינה הן את השינוי והן את סיבתו.','The revision explained itself.'],
  ['The earlier version remained attached instead of being quietly erased.','הגרסה הקודמת נשארה מצורפת במקום להימחק בשקט.','The record preserved the correction history.'],
  ['A later review began with the full table rather than the flattering summary.','בדיקה מאוחרת התחילה בטבלה המלאה ולא בסיכום המחמיא.','The complete evidence became the new starting point.']];
 if(/conflict.interest/.test(t))return[
  ['The member stated the family connection before the bids were discussed.','החבר הצהיר על הקשר המשפחתי לפני שנדונו ההצעות.','The disclosure came before the decision.'],
  ['The connection was written in the meeting minutes.','הקשר נכתב בפרוטוקול הישיבה.','The disclosure entered the official record.'],
  ['The member left the room and did not receive the private discussion.','החבר יצא מן החדר ולא קיבל את הדיון הפרטי.','The member did not influence the review.'],
  ['An independent member compared the bids under the published criteria.','חבר עצמאי השווה את ההצעות לפי הקריטריונים שפורסמו.','An independent reviewer applied the rules.'],
  ['The committee recorded who voted and who had stepped aside.','הוועדה תיעדה מי הצביע ומי נסוג.','The vote record made recusal visible.'],
  ['The selected bid had to stand on evidence rather than personal trust.','ההצעה שנבחרה הייתה צריכה לעמוד על ראיות ולא על אמון אישי.','Evidence supported the final choice.'],
  ['The relative received no special information or opportunity.','קרוב המשפחה לא קיבל מידע או הזדמנות מיוחדים.','The process gave no private advantage.'],
  ['The next agenda began with a disclosure question for every member.','סדר היום הבא התחיל בשאלת גילוי לכל חבר.','Later meetings checked conflicts early.']];
 if(/unsafe.workplace|whistleblower/.test(t))return[
  ['The workers stopped the machine or task before collecting more evidence.','העובדים עצרו את המכונה או המשימה לפני שאספו ראיות נוספות.','Immediate danger was stopped first.'],
  ['They saved dated photographs and the earlier warning receipts.','הם שמרו תצלומים מתוארכים ואישורי קבלה של האזהרות הקודמות.','The evidence showed both danger and earlier reports.'],
  ['The report described what was observed without guessing who had altered it.','הדיווח תיאר את מה שנצפה בלי לנחש מי שינה אותו.','The report separated evidence from accusation.'],
  ['It was sent through the protected safety channel.','הוא נשלח בערוץ הבטיחות המוגן.','The evidence reached the proper channel.'],
  ['A responsible inspector kept the reporters’ names from unnecessary circulation.','מפקח אחראי מנע הפצה מיותרת של שמות המדווחים.','The reporting process protected identity.'],
  ['The missing guard was restored before work resumed.','המגן החסר הוחזר לפני שהעבודה התחדשה.','The danger was repaired before use.'],
  ['The corrected record remained beside the original alteration.','הרישום המתוקן נשאר לצד השינוי המקורי.','The correction did not hide what had happened.'],
  ['At the next shift, a worker checked the guard before pressing start.','במשמרת הבאה עובד בדק את המגן לפני שלחץ על הפעלה.','The later routine began with prevention.']];
 if(/recommendation.letter|scholarship.application/.test(t))return[
  ['The student and teacher placed every claim beside a real example or document.','התלמיד והמורה הציבו כל טענה ליד דוגמה או מסמך אמיתיים.','Each claim received evidence.'],
  ['They removed impressive words that could not be supported.','הם הסירו מילים מרשימות שלא ניתן היה לתמוך בהן.','Unsupported praise was removed.'],
  ['A specific responsibility replaced a vague claim about excellence.','אחריות מסוימת החליפה טענה מעורפלת על הצטיינות.','A concrete example strengthened the application.'],
  ['The student explained genuine need without inventing hardship.','התלמיד הסביר צורך אמיתי בלי להמציא קושי.','The statement remained honest.'],
  ['The final letter named both a strength and an area still developing.','המכתב הסופי ציין הן חוזקה והן תחום שעדיין מתפתח.','The recommendation stayed balanced.'],
  ['Accurate supporting documents were checked before submission.','מסמכים תומכים מדויקים נבדקו לפני ההגשה.','The evidence matched the application.'],
  ['The student submitted the shorter, truthful version on time.','התלמיד הגיש את הגרסה הקצרה והאמיתית בזמן.','The honest version was completed.'],
  ['The crossed-out exaggeration remained in the draft as a reminder.','ההגזמה המחוקה נשארה בטיוטה כתזכורת.','The draft preserved the lesson.']];
 if(/friend.who.cheated|silent.witness|volunteer.truth/.test(t))return[
  ['The student separated what had been seen from what had only been heard.','התלמיד הפריד בין מה שראה לבין מה שרק שמע.','The student separated facts from secondhand claims.'],
  ['“I will describe the event, but I will not invent a motive,” the student said.','״אני אתאר את האירוע, אבל לא אמציא מניע,״ אמר התלמיד.','The student promised to report only known facts.'],
  ['The person involved was given a chance to speak before a conclusion was reached.','לאדם המעורב ניתנה הזדמנות לדבר לפני שהוסקה מסקנה.','The process allowed the other person to respond.'],
  ['A teacher or responsible adult read the factual note in private.','מורה או מבוגר אחראי קראו את הפתק העובדתי בפרטיות.','A responsible adult received the report privately.'],
  ['The student refused to repeat the story in the class group.','התלמיד סירב לחזור על הסיפור בקבוצה הכיתתית.','The report did not become gossip.'],
  ['When the truth was admitted, the correction was made in the same place as the false claim.','כאשר הודתה האמת, התיקון נעשה באותו מקום שבו נאמרה הטענה הכוזבת.','The correction reached the same audience.'],
  ['The consequence remained, but unfair blame was removed.','התוצאה נשארה, אך האשמה הבלתי הוגנת הוסרה.','Honesty removed unfair blame without erasing consequences.'],
  ['Later, the student used the same careful distinction between fact and assumption.','לאחר מכן התלמיד השתמש שוב באותה הבחנה זהירה בין עובדה להנחה.','The careful reporting habit lasted.']];
 if(/promise.to.a.friend|private.donation|missing.permission|incomplete.consent|confidential.conversation|good.intention/.test(t))return[
  ['The post, form, or message was paused before it reached more people.','הפרסום, הטופס או ההודעה נעצרו לפני שהגיעו לאנשים נוספים.','The sharing was stopped before spreading further.'],
  ['One student contacted the person privately and explained what had happened.','תלמיד אחד יצר קשר פרטי עם האדם והסביר מה קרה.','The affected person received a private explanation.'],
  ['Names, photographs, and locations were removed from the public version.','שמות, תצלומים ומיקומים הוסרו מן הגרסה הפומבית.','The public version no longer exposed identifying details.'],
  ['A trusted adult or coordinator arranged the help without public attention.','מבוגר או רכז מהימן ארגן את העזרה ללא תשומת לב פומבית.','A trusted person arranged private help.'],
  ['The new request described the need without identifying the receiver.','הבקשה החדשה תיארה את הצורך בלי לזהות את המקבל.','The revised request protected identity.'],
  ['Permission was requested in clear language, with a real choice to refuse.','התבקשה הסכמה בשפה ברורה ועם אפשרות אמיתית לסרב.','Consent became clear and voluntary.'],
  ['The apology named the exact detail that should not have been shared.','ההתנצלות ציינה את הפרט המדויק שלא היה צריך לשתף.','The apology addressed the specific privacy error.'],
  ['Every later project began with the question, “May we share this?”','כל פרויקט מאוחר יותר התחיל בשאלה: ״מותר לנו לשתף את זה?״','Later projects began by asking permission.']];
 if(/online.challenge/.test(t))return[
  ['The student placed the phone face down before the countdown ended.','התלמיד הניח את הטלפון כשפניו מטה לפני שהספירה לאחור הסתיימה.','The student stopped before the countdown ended.'],
  ['A friend deleted the unfinished recording from the camera.','חבר מחק מן המצלמה את הצילום שלא הושלם.','A friend deleted the unfinished recording.'],
  ['They opened a trusted safety page and read the warning aloud.','הם פתחו דף בטיחות אמין וקראו את האזהרה בקול.','They read a trusted safety warning.'],
  ['“We are not doing this,” the student wrote in the group chat.','״אנחנו לא עושים את זה,״ כתב התלמיד בקבוצה.','The student refused publicly.'],
  ['Two friends removed their names from the challenge list.','שני חברים הסירו את שמותיהם מרשימת האתגר.','Other students joined the refusal.'],
  ['The dangerous post was reported instead of copied.','הפרסום המסוכן דווח במקום להיות מועתק.','They reported the dangerous post.'],
  ['The next video showed the friends explaining the risk without repeating the act.','הסרטון הבא הראה את החברים מסבירים את הסיכון בלי לחזור על המעשה.','They explained the risk without performing it.'],
  ['The recording button stayed dark while the group walked away.','כפתור הצילום נשאר כבוי בזמן שהקבוצה התרחקה.','The group left without recording the challenge.']];
 if(/sitting.all.afternoon|week.without.movement|study.screen.balance/.test(t))return[
  ['The student set a twenty-five-minute study timer and a ten-minute movement timer.','התלמיד כיוון טיימר לעשרים וחמש דקות לימוד וטיימר לעשר דקות תנועה.','The plan used separate study and movement timers.'],
  ['When the bell sounded, the notebook closed before another tab opened.','כאשר נשמע הצלצול המחברת נסגרה לפני שנפתחה לשונית נוספת.','The student began the real break on time.'],
  ['They walked around the building and left the phones in their bags.','הם הלכו סביב הבניין והשאירו את הטלפונים בתיקים.','They walked without using their phones.'],
  ['After the walk, the student solved the next question without rereading it three times.','לאחר ההליכה התלמיד פתר את השאלה הבאה בלי לקרוא אותה שלוש פעמים.','Concentration improved after movement.'],
  ['The chair was moved away from the desk during every later break.','הכיסא הורחק מן השולחן בכל הפסקה מאוחרת יותר.','Later breaks included standing up.'],
  ['A friend joined the walk instead of sending another message.','חבר הצטרף להליכה במקום לשלוח הודעה נוספת.','A friend chose shared movement.'],
  ['The study plan still contained enough time for the important work.','תכנית הלימוד עדיין כללה די זמן לעבודה החשובה.','Movement did not remove needed study time.'],
  ['At the end of the week, the timers remained beside the books.','בסוף השבוע הטיימרים נשארו ליד הספרים.','The balanced routine continued.']];
 if(/class.plant|school.garden/.test(t))return[
  ['The class moved the pot away from the strongest afternoon sun.','הכיתה הרחיקה את העציץ מן השמש החזקה ביותר אחר הצהריים.','The class changed the plant’s position.'],
  ['Pairs checked the soil on different days instead of watering by guess.','זוגות בדקו את האדמה בימים שונים במקום להשקות לפי ניחוש.','Pairs checked the soil before watering.'],
  ['One student wrote the water amount beside each date.','תלמיד אחד כתב את כמות המים ליד כל תאריך.','The class recorded each amount of water.'],
  ['They waited when the soil was still wet.','הם המתינו כאשר האדמה עדיין הייתה רטובה.','They did not water too often.'],
  ['The curled leaf did not recover, but the next leaf opened normally.','העלה שהתעקם לא התאושש, אך העלה הבא נפתח כרגיל.','A new healthy leaf showed improvement.'],
  ['The small bud opened after several patient days.','הניצן הקטן נפתח לאחר כמה ימים של סבלנות.','The bud opened after steady care.'],
  ['The schedule stayed beside the pot during the next hot week.','לוח הזמנים נשאר ליד העציץ בשבוע החם הבא.','The care schedule remained in use.'],
  ['A new pair checked the soil before anyone reached for water.','זוג חדש בדק את האדמה לפני שמישהו הושיט יד למים.','The next students followed the same careful method.']];
 if(/bird.nest|class.pet|wildlife/.test(t))return[
  ['The students stepped behind the marked line and watched quietly.','התלמידים צעדו אל מאחורי הקו המסומן וצפו בשקט.','The students watched from a safe distance.'],
  ['They asked an adult or wildlife expert before changing anything.','הם שאלו מבוגר או מומחה לחיות בר לפני ששינו דבר.','They asked for informed help.'],
  ['Nobody touched the nest, animal, or food bowl without permission.','איש לא נגע בקן, בבעל החיים או בקערת המזון ללא רשות.','They avoided unsafe interference.'],
  ['A quiet area was kept clear during the busiest part of the day.','אזור שקט נשמר פנוי בחלק העמוס ביותר של היום.','They protected a quiet area.'],
  ['The class recorded one observation each day instead of crowding around.','הכיתה תיעדה תצפית אחת בכל יום במקום להצטופף.','The class observed without crowding.'],
  ['A small change in movement or appetite was noticed early.','שינוי קטן בתנועה או בתיאבון התגלה מוקדם.','Careful observation revealed a change.'],
  ['The adult explained which action would help and which would cause stress.','המבוגר הסביר איזו פעולה תעזור ואיזו תגרום לחץ.','The students learned how to help safely.'],
  ['The marked line remained after curiosity had become responsible care.','הקו המסומן נשאר לאחר שהסקרנות הפכה לטיפול אחראי.','The safe observation rule remained.']];
 if(/long.term.solution/.test(t))return[
  ['The team opened every earlier repair report and marked the repeated point.','הצוות פתח כל דוח תיקון קודם וסימן את הנקודה החוזרת.','The team compared the earlier repairs.'],
  ['They inspected the hidden source instead of covering the visible damage again.','הם בדקו את המקור הנסתר במקום לכסות שוב את הנזק הנראה.','They investigated the underlying cause.'],
  ['One table compared initial cost, future cost, time, and risk.','טבלה אחת השוותה עלות התחלתית, עלות עתידית, זמן וסיכון.','The options were compared across four factors.'],
  ['The lasting option cost more at the beginning but removed the repeated failure.','האפשרות המתמשכת עלתה יותר בהתחלה אך הסירה את התקלה החוזרת.','The lasting option addressed the repeated failure.'],
  ['The team explained why the cheapest immediate choice would cost more later.','הצוות הסביר מדוע האפשרות המיידית הזולה ביותר תעלה יותר בהמשך.','They explained the long-term cost.'],
  ['Work stopped once so that it would not need to stop every month.','העבודה נעצרה פעם אחת כדי שלא תצטרך להיעצר בכל חודש.','One planned interruption prevented repeated interruptions.'],
  ['The next inspection found no new damage at the old point.','הבדיקה הבאה לא מצאה נזק חדש בנקודה הישנה.','The next inspection showed that the cause had been removed.'],
  ['The repair log ended with a cause removed, not another patch added.','יומן התיקונים הסתיים בהסרת סיבה, לא בהוספת טלאי נוסף.','The final record showed a lasting repair.']];
 if(/accessible.trip/.test(t))return[
  ['The class walked both possible paths before choosing one.','הכיתה הלכה בשני המסלולים האפשריים לפני שבחרה.','The class tested both routes.'],
  ['They timed the steep section and the longer gradual section.','הם מדדו את זמן החלק התלול ואת זמן החלק ההדרגתי הארוך יותר.','They compared the route times.'],
  ['A student marked two safe rest points without removing the main climb.','תלמיד סימן שתי נקודות מנוחה בטוחות בלי להסיר את העלייה העיקרית.','The plan added support without removing challenge.'],
  ['The equipment list changed so that every student carried a useful part.','רשימת הציוד השתנתה כך שכל תלמיד נשא חלק מועיל.','Every student received a real role.'],
  ['On the trip, the class reached the viewpoint together by the revised path.','בטיול הגיעה הכיתה יחד לנקודת התצפית במסלול המתוקן.','The revised route brought the class to the same destination.'],
  ['Nobody was sent to a separate activity or left waiting.','איש לא נשלח לפעילות נפרדת ולא נשאר להמתין.','Every student remained part of the shared trip.'],
  ['The difficult section still required effort from the whole group.','החלק הקשה עדיין דרש מאמץ מכל הקבוצה.','The trip remained challenging.'],
  ['The second route stayed on the map for future classes.','המסלול השני נשאר במפה עבור כיתות עתידיות.','Future classes kept the accessible route.']];
 if(/first.job.interview/.test(t))return[
  ['Noa practiced answering one question without reading a prepared speech.','נועה תרגלה מענה על שאלה אחת בלי לקרוא נאום מוכן.','Noa practiced a natural answer.'],
  ['The teacher stopped her when an answer became too general.','המורה עצרה אותה כאשר תשובה נעשתה כללית מדי.','The teacher asked for a specific example.'],
  ['Noa described a real problem she had solved during volunteer work.','נועה תיארה בעיה אמיתית שפתרה בעבודת התנדבות.','Noa gave an honest example.'],
  ['She prepared two questions about the work instead of only rehearsing praise.','היא הכינה שתי שאלות על העבודה במקום לתרגל רק דברי שבח.','She prepared thoughtful questions.'],
  ['On interview day, she arrived early enough to read the notice once more.','ביום הריאיון היא הגיעה מוקדם מספיק כדי לקרוא שוב את המודעה.','She arrived prepared and on time.'],
  ['When asked about experience, she explained both what she knew and what she still needed to learn.','כשנשאלה על ניסיון היא הסבירה הן מה ידעה והן מה עדיין הייתה צריכה ללמוד.','She answered honestly about her experience.'],
  ['The interviewer wrote a note after her specific example.','המראיין כתב הערה לאחר הדוגמה המסוימת שלה.','Her real example made an impression.'],
  ['Noa left with the crossed-out false answer still inside her folder.','נועה יצאה כשהתשובה הכוזבת המחוקה עדיין בתוך התיקייה שלה.','She kept the reminder of her honest preparation.']];
 if(/shift.exchange/.test(t))return[
  ['The first worker sent the request to both the colleague and the manager.','העובד הראשון שלח את הבקשה הן לעמית והן למנהל.','The request reached everyone responsible.'],
  ['The colleague replied with the exact date and hours.','העמית השיב עם התאריך והשעות המדויקים.','The reply stated the exact shift.'],
  ['The manager checked that the change did not leave another task uncovered.','המנהל בדק שהשינוי לא השאיר משימה אחרת ללא כיסוי.','The manager checked the full schedule.'],
  ['Only then were the two names moved on the shared schedule.','רק אז הועברו שני השמות בלוח המשותף.','The schedule changed after approval.'],
  ['A confirmation message repeated the final arrangement in one sentence.','הודעת אישור חזרה על הסידור הסופי במשפט אחד.','The final arrangement was stated clearly.'],
  ['Both workers checked the updated schedule before leaving.','שני העובדים בדקו את הלוח המעודכן לפני שעזבו.','Both workers verified the change.'],
  ['The exchanged shift began with the correct person at the door.','המשמרת שהוחלפה התחילה כאשר האדם הנכון היה בדלת.','The correct worker arrived for the shift.'],
  ['The written confirmation became the model for the next exchange.','האישור הכתוב נעשה לדגם עבור ההחלפה הבאה.','Later exchanges used the same clear process.']];
 if(/shared.computer/.test(t))return[
  ['The students wrote each urgent task beside its deadline.','התלמידים כתבו כל משימה דחופה ליד מועד ההגשה שלה.','They compared the real deadlines.'],
  ['The game was saved and closed before the timer began.','המשחק נשמר ונסגר לפני שהטיימר התחיל.','The computer became available for schoolwork.'],
  ['The first student completed the part that required the computer and then logged out.','התלמיד הראשון השלים את החלק שדרש מחשב ואז התנתק.','The first turn ended after the necessary work.'],
  ['The next student began when the timer sounded.','התלמיד הבא התחיל כאשר הטיימר צלצל.','The next turn began on time.'],
  ['Work that could be done on paper was moved away from the keyboard.','עבודה שניתן היה לבצע על נייר הורחקה מן המקלדת.','Computer time was used only when needed.'],
  ['Nobody lost an urgent file or missed a deadline.','איש לא איבד קובץ דחוף ולא החמיץ מועד הגשה.','The fair schedule protected the urgent tasks.'],
  ['The sign-up sheet stayed beside the computer for the rest of the week.','דף ההרשמה נשאר ליד המחשב במשך שאר השבוע.','The shared rule remained visible.'],
  ['The next game began only after the waiting list was empty.','המשחק הבא התחיל רק לאחר שרשימת ההמתנה התרוקנה.','Leisure use waited until urgent work was done.']];
 if(/conflict.interest|whistleblower|biased.selection|incomplete.consent|recommendation.letter|unsafe.workplace|scholarship.application|selective.report|late.evidence|confidential.conversation/.test(t))return[
  ['One person underlined the relevant line and turned the page toward the group.','אדם אחד מתח קו מתחת לשורה הנוגעת לעניין וסובב את הדף לעבר הקבוצה.','One person showed the relevant line to the group.'],
  ['“This connection must appear in the record,” the chairperson said.','״הקשר הזה חייב להופיע ברישום,״ אמר יושב הראש.','The chairperson required the connection to be recorded.'],
  ['The person involved stepped back from the decision or unsafe task.','האדם המעורב נסוג מן ההחלטה או מן המשימה הלא בטוחה.','The involved person withdrew from the decision or unsafe task.'],
  ['The group wrote the reason beside the decision instead of hiding it.','הקבוצה כתבה את הסיבה ליד ההחלטה במקום להסתיר אותה.','The group recorded the reason openly.'],
  ['The evidence was sent through the correct protected channel.','הראיות נשלחו בערוץ המוגן המתאים.','The evidence was sent through the proper channel.'],
  ['The revised rule was tested against every name on the list.','הכלל המתוקן נבדק מול כל שם ברשימה.','The revised rule was applied to every candidate.'],
  ['When new evidence arrived, the earlier decision was opened again.','כאשר הגיעו ראיות חדשות, ההחלטה הקודמת נפתחה מחדש.','New evidence caused the earlier decision to be reviewed.'],
  ['The final record showed who had decided, why, and on what evidence.','הרישום הסופי הראה מי החליט, מדוע ועל סמך אילו ראיות.','The final record made the decision process clear.']];
 if(/food.project|food.waste|cafeteria|meal/.test(t))return[
  ['The committee counted full and half-empty trays for five days.','הוועדה ספרה מגשים מלאים וחצי ריקים במשך חמישה ימים.','The committee counted returned trays for five days.'],
  ['The kitchen offered a smaller first portion and allowed a second serving.','המטבח הציע מנה ראשונה קטנה יותר ואפשר מנה נוספת.','The kitchen offered smaller first portions with more available.'],
  ['Students chose a portion card before reaching the serving table.','התלמידים בחרו כרטיס של גודל מנה לפני שהגיעו לשולחן ההגשה.','Students selected a portion size before being served.'],
  ['Untouched sealed food was moved to the marked collection box.','מזון סגור שלא נגעו בו הועבר לקופסת האיסוף המסומנת.','Safe untouched food was placed in the collection box.'],
  ['A volunteer checked the time and storage instructions on every box.','מתנדב בדק את השעה ואת הוראות האחסון על כל קופסה.','A volunteer checked safe storage details.'],
  ['By Friday, the waste container was less than half full.','עד יום שישי מכל הפסולת היה מלא פחות מחציו.','By Friday, the waste container was less than half full.'],
  ['A student who was still hungry returned for another serving without embarrassment.','תלמיד שעדיין היה רעב חזר למנה נוספת בלי מבוכה.','Students could receive more food without embarrassment.'],
  ['The new chart stayed beside the serving table for the next month.','הטבלה החדשה נשארה ליד שולחן ההגשה במשך החודש הבא.','The serving chart remained in use.']];
 if(/community.survey|public.meeting|limited.community.budget|neighborhood.plan|clean.transport|new.bus.route|neighborhood.park|community.library|weekend.volunteer/.test(t))return[
  ['Two students visited the place at a busy time and again when it was quiet.','שני תלמידים ביקרו במקום בשעה עמוסה ושוב כשהיה שקט.','Students observed the place at different times.'],
  ['They asked, “Whose view is still missing?” before counting the answers.','הם שאלו: ״דעתו של מי עדיין חסרה?״ לפני שספרו את התשובות.','They checked whose view was missing.'],
  ['A new response was added from the street or group left off the first map.','תשובה חדשה נוספה מן הרחוב או הקבוצה שלא הופיעו במפה הראשונה.','They added a response from the missing area.'],
  ['The group compared access, safety, cost, and environmental effect in four columns.','הקבוצה השוותה נגישות, בטיחות, עלות והשפעה סביבתית בארבע עמודות.','The group compared four practical effects.'],
  ['One popular idea moved down the list after its cost became clear.','רעיון פופולרי אחד ירד ברשימה לאחר שעלותו התבהרה.','A popular idea lost support when its cost became clear.'],
  ['The students redrew the proposal and protected the most important shared need.','התלמידים שרטטו מחדש את ההצעה והגנו על הצורך המשותף החשוב ביותר.','The students revised the proposal around a shared need.'],
  ['They explained both the chosen option and the option they had rejected.','הם הסבירו הן את האפשרות שנבחרה והן את האפשרות שנדחתה.','They explained the choice and its alternative.'],
  ['The final map included every street or group that had answered.','המפה הסופית כללה כל רחוב או קבוצה שענו.','The final map represented every responding area.']];
 if(/group.credit|uncredited.idea|unequal.group|perfect.project/.test(t))return[
  ['The group opened the document history instead of arguing from memory.','הקבוצה פתחה את היסטוריית המסמך במקום להתווכח מן הזיכרון.','The group checked the document history.'],
  ['“Who wrote this section?” one student asked.','״מי כתב את החלק הזה?״ שאל תלמיד אחד.','A student asked who had written a section.'],
  ['The quiet member pointed to three drafts saved under the same name.','החבר השקט הצביע על שלוש טיוטות שנשמרו תחת אותו שם.','The quiet member showed three saved drafts.'],
  ['Tasks were written beside names before the final work continued.','המשימות נכתבו ליד שמות לפני שהעבודה הסופית נמשכה.','The group connected tasks with names.'],
  ['One student returned a title or idea to the person who had created it.','תלמיד אחד החזיר כותרת או רעיון לאדם שיצר אותם.','Credit was returned to the creator.'],
  ['The final presentation included a brief explanation from every member.','המצגת הסופית כללה הסבר קצר מכל חבר.','Every member spoke in the final presentation.'],
  ['The project looked less perfect after the honest corrections, but it was truly theirs.','הפרויקט נראה פחות מושלם לאחר התיקונים הכנים, אך היה באמת שלהם.','The honest project belonged to the students.'],
  ['For the next task, roles and credit were agreed before work began.','במשימה הבאה הוסכמו התפקידים והקרדיט לפני תחילת העבודה.','The next project began with clear roles and credit.']];
 if(/helmet|bicycle|scooter|ride/.test(t))return[
  ['A friend pointed at the empty helmet before the rider reached the gate.','חבר הצביע על הקסדה הריקה לפני שהרוכב הגיע לשער.','A friend pointed to the helmet before the rider reached the gate.'],
  ['“Stop here,” the friend called when the front wheel began to turn.','״עצור כאן,״ קרא החבר כאשר הגלגל הקדמי התחיל להסתובב.','The friend called for the rider to stop.'],
  ['The rider put both feet on the ground and checked the loose strap.','הרוכב הניח את שתי רגליו על הקרקע ובדק את הרצועה הרופפת.','The rider stopped and checked the strap.'],
  ['A second helmet was brought from the shelf near the door.','קסדה נוספת הובאה מן המדף ליד הדלת.','They brought another helmet from a nearby shelf.'],
  ['The friend waited while the buckle clicked under the rider’s chin.','החבר המתין עד שהאבזם נסגר מתחת לסנטרו של הרוכב.','The friend waited until the helmet was fastened.'],
  ['They walked the scooter across the busy crossing instead of riding through it.','הם הובילו את הקורקינט ברגל במעבר החצייה העמוס במקום לרכוב בו.','They walked across the busy crossing.'],
  ['At the corner, a police officer looked at both helmets and nodded.','בפינה שוטר הביט בשתי הקסדות והנהן.','A police officer saw both helmets and nodded.'],
  ['The next afternoon, the helmet was already on before the wheels moved.','למחרת אחר הצהריים הקסדה כבר הייתה על הראש לפני שהגלגלים נעו.','The next ride began with the helmet already on.']];
 if(/screen|video|feed|phone|algorithm|attention|controls.next.hour|missed.practice.screen/.test(t))return[
  ['The student set one stopping time before opening the app.','התלמיד קבע זמן עצירה אחד לפני פתיחת היישומון.','The stopping point was chosen in advance.'],
  ['The alarm rang, and the screen was locked before the next item loaded.','ההתראה צלצלה והמסך ננעל לפני שהפריט הבא נטען.','The student stopped before another item appeared.'],
  ['Notifications stayed silent during one complete task.','ההתראות נשארו שקטות במשך משימה שלמה אחת.','The task continued without notifications.'],
  ['A friend waited nearby and began the planned activity on time.','חבר המתין בקרבת מקום והתחיל את הפעילות המתוכננת בזמן.','A friend helped the plan begin on time.'],
  ['The student chose one item deliberately instead of following the endless feed.','התלמיד בחר פריט אחד במכוון במקום לעקוב אחר העדכונים האינסופיים.','The student made one deliberate choice.'],
  ['After the break, the unfinished work received full attention.','לאחר ההפסקה העבודה שלא הושלמה קיבלה תשומת לב מלאה.','The student returned to the important work.'],
  ['The same stopping rule was used again the next day.','אותו כלל עצירה שימש שוב למחרת.','The new habit continued.'],
  ['The student could explain who had chosen the next activity.','התלמיד ידע להסביר מי בחר את הפעילות הבאה.','The student regained control of the time.']];
 if(/screen|video|feed|phone|algorithm|digital tool|homework|project|answer|attention|controls.next.hour/.test(t))return[
  ['The student read the question again and covered the ready-made answer with one hand.','התלמיד קרא שוב את השאלה וכיסה בידו את התשובה המוכנה.','The student reread the question and covered the prepared answer.'],
  ['The teacher asked, “What does this sentence mean in your own words?”','המורה שאלה: ״מה משמעות המשפט הזה במילים שלך?״','The teacher asked for the meaning in the student’s own words.'],
  ['No answer came, and the student’s face became red.','לא הגיעה תשובה, ופניו של התלמיד האדימו.','The student could not answer and became embarrassed.'],
  ['After class, the student opened the source beside a blank page.','לאחר השיעור התלמיד פתח את המקור ליד דף ריק.','After class, the student opened the source beside a blank page.'],
  ['Three useful words were copied and explained one by one.','שלוש מילים שימושיות הועתקו והוסברו בזו אחר זו.','The student copied and explained three useful words.'],
  ['The phone was placed in a drawer for twenty minutes.','הטלפון הונח במגירה לעשרים דקות.','The phone was put in a drawer for twenty minutes.'],
  ['This time, the student wrote one paragraph without copying it.','הפעם התלמיד כתב פסקה אחת בלי להעתיק אותה.','This time, the student wrote one paragraph independently.'],
  ['The next question was answered before the screen lit up again.','על השאלה הבאה ניתנה תשובה לפני שהמסך נדלק שוב.','The student answered the next question before checking the screen.']];
 if(/photo|headline|rumor|report|account|message|consent|evidence|image|privacy|witness/.test(t))return[
  ['One student held the phone closer and read the date under the picture.','תלמיד אחד קירב את הטלפון וקרא את התאריך שמתחת לתמונה.','One student checked the date below the picture.'],
  ['The original page showed a wider picture with two more people in it.','העמוד המקורי הציג תמונה רחבה יותר ובה שני אנשים נוספים.','The original page showed a wider picture.'],
  ['“We shared only half the story,” a student said quietly.','״שיתפנו רק חצי מהסיפור,״ אמר תלמיד בשקט.','A student admitted that they had shared only part of the story.'],
  ['The group deleted the post and wrote the correction in the same place.','הקבוצה מחקה את הפרסום וכתבה את התיקון באותו מקום.','The group deleted the post and added a clear correction.'],
  ['They sent the person in the photograph a private apology.','הם שלחו לאדם שבתמונה התנצלות פרטית.','They sent a private apology to the person in the photograph.'],
  ['The next message stayed in draft form until two sources were checked.','ההודעה הבאה נשארה כטיוטה עד שנבדקו שני מקורות.','They checked two sources before sending the next message.'],
  ['A small “source” line was added below every later report.','שורת ״מקור״ קטנה נוספה מתחת לכל דיווח מאוחר יותר.','Later reports included a source line.'],
  ['The corrected picture received fewer shares, but it remained online.','התמונה המתוקנת זכתה לפחות שיתופים, אך נשארה ברשת.','The corrected picture remained available even though fewer people shared it.']];
 if(/team|group|credit|captain|runner|missed.practice|selection|sports|race|winning|athlete|championship/.test(t)&&!/emergency/.test(t))return[
  ['The coach placed the list on the bench where everyone could read it.','המאמן הניח את הרשימה על הספסל במקום שכולם יכלו לקרוא אותה.','The coach placed the list where everyone could read it.'],
  ['One student folded their arms and moved away from the group.','תלמיד אחד שילב את זרועותיו והתרחק מן הקבוצה.','One student folded their arms and stepped away.'],
  ['A notebook showed who had planned, measured, corrected, and practiced.','מחברת הראתה מי תכנן, מדד, תיקן והתאמן.','A notebook showed each student’s work.'],
  ['The captain read every name aloud, including the quiet student’s name.','הקפטן קרא כל שם בקול, כולל שמו של התלמיד השקט.','The captain read every name aloud.'],
  ['During the final task, the quiet student noticed the open space first.','במשימה האחרונה התלמיד השקט הבחין ראשון במקום הפנוי.','The quiet student noticed the open space first.'],
  ['A short pass reached the last player just before the whistle.','מסירה קצרה הגיעה לשחקן האחרון רגע לפני השריקה.','A short pass reached the final player before the whistle.'],
  ['The group changed the names on the poster before displaying it.','הקבוצה שינתה את השמות על הכרזה לפני שהציגה אותה.','The group corrected the names on the poster.'],
  ['At the next meeting, tasks were written beside names from the start.','במפגש הבא המשימות נכתבו ליד השמות כבר מן ההתחלה.','At the next meeting, every task had a name beside it.']];
 if(/clean.playground|reusable.bottle|repair.caf|energy.audit|cost.of.convenience|clean.transport/.test(t))return[
  ['The group recorded a starting count before changing anything.','הקבוצה תיעדה ספירה התחלתית לפני ששינתה דבר.','The first measurement created a baseline.'],
  ['They tested one practical change instead of announcing a large promise.','הם בדקו שינוי מעשי אחד במקום להכריז הבטחה גדולה.','The group chose a small testable action.'],
  ['Items that could still be repaired or reused were kept out of the waste pile.','פריטים שעדיין ניתן היה לתקן או להשתמש בהם שוב הוצאו מערמת הפסולת.','Usable items were saved from disposal.'],
  ['The group checked whether the new choice was affordable and accessible.','הקבוצה בדקה אם הבחירה החדשה הייתה במחיר סביר ונגישה.','The test included cost and access.'],
  ['A second measurement showed a smaller amount or lower use.','מדידה שנייה הראתה כמות קטנה יותר או שימוש נמוך יותר.','The later result showed improvement.'],
  ['One inconvenient part of the plan was changed after honest feedback.','חלק לא נוח אחד בתכנית שונה לאחר משוב כן.','Feedback improved the plan.'],
  ['The students presented both the benefit and the remaining difficulty.','התלמידים הציגו הן את התועלת והן את הקושי שנותר.','The presentation did not hide the trade-off.'],
  ['The successful part became a regular routine rather than a one-day event.','החלק המוצלח נעשה להרגל קבוע ולא לאירוע חד־יומי.','The useful change continued.']];
 if(/water|garden|waste|energy|environment|plastic|transport|park|river/.test(t))return[
  ['The class filled one clear bag with the rubbish collected before lunch.','הכיתה מילאה שקית שקופה אחת בפסולת שנאספה לפני ארוחת הצהריים.','The class filled one clear bag with rubbish.'],
  ['A student marked the water level on a bottle with a blue pen.','תלמיד סימן בעט כחול את גובה המים בבקבוק.','A student marked the water level on a bottle.'],
  ['The next morning, the mark was lower by two fingers.','למחרת בבוקר הסימן היה נמוך ברוחב שתי אצבעות.','The water level was clearly lower the next morning.'],
  ['They closed one leaking tap and placed a bucket under another.','הם סגרו ברז דולף אחד והניחו דלי מתחת לאחר.','They closed one leaking tap and placed a bucket under another.'],
  ['Dry leaves were moved away from the small drain.','עלים יבשים הורחקו מפתח הניקוז הקטן.','They moved dry leaves away from the drain.'],
  ['By Friday, the bucket stayed almost empty.','עד יום שישי הדלי נשאר כמעט ריק.','By Friday, little water had collected in the bucket.'],
  ['A green shoot appeared beside the stone marked on their map.','נבט ירוק הופיע ליד האבן שסומנה במפה שלהם.','A green shoot appeared beside a marked stone.'],
  ['The measurement chart remained on the classroom wall.','טבלת המדידות נשארה על קיר הכיתה.','The measurement chart stayed on the classroom wall.']];
 if(/emergency|hospital|first aid|injur|safety|workplace|different.kind.of.strength/.test(t))return[
  ['One student moved the chairs away and called an adult.','תלמיד אחד הרחיק את הכיסאות וקרא למבוגר.','One student moved the chairs and called an adult.'],
  ['Another student read the emergency number from the card on the wall.','תלמיד אחר קרא את מספר החירום מן הכרטיס שעל הקיר.','Another student read the emergency number from the wall.'],
  ['“Stay with me,” the calmest student said from beside the door.','״הישאר איתי,״ אמר התלמיד הרגוע ביותר ליד הדלת.','A calm student stayed nearby and spoke clearly.'],
  ['The injured person answered with a small nod.','האדם שנפגע ענה בהנהון קטן.','The injured person answered with a small nod.'],
  ['Nobody touched the bag or tool that had caused the fall.','איש לא נגע בתיק או בכלי שגרם לנפילה.','Nobody moved the object that had caused the fall.'],
  ['The teacher arrived carrying the red first-aid box.','המורה הגיעה כשהיא נושאת את תיק העזרה הראשונה האדום.','The teacher arrived with the red first-aid box.'],
  ['Afterward, the loose cable was fixed to the wall.','לאחר מכן הכבל הרופף חובר לקיר.','Afterward, the loose cable was fixed.'],
  ['At the next practice, the same students knew where to stand.','בתרגול הבא אותם תלמידים ידעו היכן לעמוד.','At the next practice, the students knew what to do.']];
 if(/bus|route|classroom|school|notebook|library|form|application|letter|interview|job/.test(t))return[
  ['The student compared the number on the paper with the number above the door.','התלמיד השווה את המספר שעל הדף למספר שמעל הדלת.','The student compared the paper with the number above the door.'],
  ['A teacher circled one line and wrote the correct time beside it.','מורה הקיפה שורה אחת וכתבה לידה את השעה הנכונה.','A teacher circled one line and added the correct time.'],
  ['The student whispered the new room number twice.','התלמיד לחש פעמיים את מספר הכיתה החדש.','The student repeated the new room number twice.'],
  ['At the stairs, a classmate pointed left instead of simply walking away.','במדרגות חבר לכיתה הצביע שמאלה במקום להמשיך בדרכו.','A classmate stopped and pointed toward the correct place.'],
  ['They reached the door while the teacher was still writing the date.','הם הגיעו לדלת בזמן שהמורה עדיין כתבה את התאריך.','They arrived while the teacher was writing the date.'],
  ['The missing line was added to the form in blue ink.','השורה החסרה נוספה לטופס בדיו כחול.','The missing line was added to the form.'],
  ['The paper was checked once more before it was handed in.','הדף נבדק פעם נוספת לפני שנמסר.','The paper was checked again before being submitted.'],
  ['The corrected note stayed inside the front cover of the notebook.','הפתק המתוקן נשאר בתוך הכריכה הקדמית של המחברת.','The corrected note stayed inside the notebook.']];
 return[
  ['“Show me exactly what happened,” someone said.','״תראה לי בדיוק מה קרה,״ אמר מישהו.','Someone asked to see exactly what had happened.'],
  ['They placed the two versions or choices beside each other.','הם הניחו את שתי הגרסאות או האפשרויות זו לצד זו.','They compared the two versions or choices.'],
  ['One person pointed to the moment when the situation had changed.','אדם אחד הצביע על הרגע שבו המצב השתנה.','One person identified the turning point.'],
  ['“I understand the problem now,” came the reply.','״עכשיו אני מבין את הבעיה,״ הגיעה התשובה.','Another person recognized the problem.'],
  ['They chose one action they could complete immediately.','הם בחרו פעולה אחת שיכלו להשלים מיד.','They selected one immediate action.'],
  ['The result helped one person but left another difficulty.','התוצאה עזרה לאדם אחד אך הותירה קושי נוסף.','The first result did not solve everything.'],
  ['They returned later to check what had changed.','הם חזרו מאוחר יותר כדי לבדוק מה השתנה.','They returned to check the result.'],
  ['A later action showed that they had remembered the lesson.','פעולה מאוחרת הראתה שהם זכרו את הלקח.','Their later behavior showed lasting change.']];
}
function stableStoryHash(text){
 let value=2166136261;
 for(let i=0;i<text.length;i++)value=Math.imul(value^text.charCodeAt(i),16777619);
 return value>>>0;
}
function storyRows(rows,s,salt,count=rows.length){
 if(!rows.length||count<1)return[];
 const start=stableStoryHash(s.id+'|'+salt)%rows.length,out=[];
 for(let i=0;i<Math.min(count,rows.length);i++)out.push(rows[(start+i)%rows.length]);
 return out;
}
function rebuild(s,arc){
 const core=anchors(s),need=s.scenes.length-4,fill=[];
 // Keep every generated scene inside one narrative logic. Earlier versions
 // mixed broad topic banks (for example, "water", "school", or "team") and
 // could import food-waste dialogue into a bottle-station story or classroom
 // directions into a missing-notebook story. The four original event anchors
 // remain story-specific; the intervening scenes now follow one complete plot
 // structure in order. This is deliberately less flashy than a mismatched
 // concrete detail, but it preserves cause, reference, and consequence.
 const simpleArc=arc.lines.map(row=>[row[2],row[1],row[2]]);
 const simpleExtra=extra.map(row=>[row[2],row[1],row[2]]);
 const orderedArc=s.group==='ES'
  ?[...arc.lines,...(arcVoices[arc.en]||[]),...extra]
  :s.group==='A1'
   ?[...(arcVoices[arc.en]||[]),...simpleArc,...simpleExtra]
   :[...(arcVoices[arc.en]||[]),...arc.lines,...extra];
 // Very long stories may need more scenes than the structure and its dialogue
 // supply together. Neutral reflective beats extend only those long stories;
 // they contain no props, settings, or actions borrowed from another story.
 const source=orderedArc;
 // Do not replace a neutral noun phrase with a name mechanically. That created
 // broken forms such as "Roni responsible" from "the student responsible"
 // and could leave a named character followed by singular they. Story-specific
 // anchors carry the names; neutral bridge scenes remain gender-safe.
 for(let i=0;i<need;i++)fill.push(pair(source[i%source.length],s.group));
 // Preserve the original opening and disruption before the arc develops, then
 // keep the story-specific decisive action and result as the final two scenes.
 // This prevents a generic setup from appearing after the problem was solved.
 const positions=[0,1,s.scenes.length-2,s.scenes.length-1];
 const out=[];let ci=0,fi=0;
 for(let i=0;i<s.scenes.length;i++)out.push(ci<4&&i===positions[ci]?core[ci++]:fill[fi++]);
 return out.map(scene=>scene.map(part=>[
  part[0]
   .replace(/,\s+(to|near|beside|inside|during|after|before|because|when|while|using|that)\b/gi,' $1')
   .replace(/,\s+rather than\b/gi,' rather than')
   .replace(/\s{2,}/g,' '),
  part[1]
 ]));
}
const counters={},previousArc={};
// Legacy cover normalization: all 24 portrait files converted to 1200x800 WebP.
const upgradedCovers={
 'l1-a1-new-student':'story-covers-v3/new-student.webp',
 'new-1-a1-helmet-handlebar':'story-covers-v3/helmet-handlebar.webp',
 'new-2-a1-homework-could-not-explain':'story-covers-v3/homework-could-not-explain.webp',
 'l1-a1-lost-dog':'story-covers-v3/lost-dog.webp',
 'new-1-a2-one-scooter-two-friends':'story-covers-v3/one-scooter-two-friends.webp',
 'new-2-a2-false-emergency-message':'story-covers-v3/false-emergency-message.webp'
 ,'l1-a1-back-to-school':'story-covers-v3/back-to-school.webp'
 ,'l1-a2-no-phone':'story-covers-v3/day-without-phone.webp'
 ,'l1-a2-last-runner':'story-covers-v3/last-runner.webp'
 ,'l1-a2-clean-playground':'story-covers-v3/clean-playground.webp'
 ,'l1-es-wrong-message':'story-covers-v3/wrong-message.webp'
 ,'l1-es-appearance':'story-covers-v3/appearance.webp'
 ,'l1-es-school-garden':'story-covers-v3/school-garden.webp'
 ,'l2-a1-wallet':'story-covers-v3/wallet.webp'
 ,'l2-a1-helping-neighbor':'story-covers-v3/helping-neighbor.webp'
 ,'l2-a1-team-place':'story-covers-v3/team-place.webp'
 ,'l2-a2-photo-spread':'story-covers-v3/photo-spread.webp'
 ,'l2-a2-cheating':'story-covers-v3/cheating.webp'
 ,'l2-a2-injured-captain':'story-covers-v3/injured-captain.webp'
 ,'l2-es-strength':'story-covers-v3/strength.webp'
 ,'l2-es-food-project':'story-covers-v3/food-project.webp'
 ,'l2-es-river':'story-covers-v3/river.webp'
 ,'l3-a1-final-place':'story-covers-v3/final-place.webp'
 ,'l3-a1-park':'story-covers-v3/park.webp'
 ,'new-1-a1-wrong-classroom':'story-covers-v3/wrong-classroom.webp'
 ,'new-1-a1-missing-notebook':'story-covers-v3/missing-notebook.webp'
 ,'new-1-a1-safe-bicycle-ride':'story-covers-v3/safe-bicycle-ride.webp'
 ,'new-1-a1-class-pet':'story-covers-v3/class-pet.webp'
 ,'new-1-a1-one-more-video':'story-covers-v3/one-more-video.webp'
 ,'new-1-a2-unequal-group':'story-covers-v3/unequal-group.webp'
 ,'new-1-a2-new-bus-route':'story-covers-v3/new-bus-route.webp'
 ,'new-1-a2-unfair-team-choice':'story-covers-v3/unfair-team-choice.webp'
 ,'new-1-a2-screen-time-plan':'story-covers-v3/screen-time-plan.webp'
 ,'new-1-a2-water-bottle-station':'story-covers-v3/water-bottle-station.webp'
 ,'new-1-es-ride-changed-plans':'story-covers-v3/ride-changed-plans.webp'
 ,'new-1-es-misleading-headline':'story-covers-v3/misleading-headline.webp'
 ,'new-1-es-uncredited-idea':'story-covers-v3/uncredited-idea.webp'
 ,'new-1-es-edited-photograph':'story-covers-v3/edited-photograph.webp'
 ,'new-1-es-feed-never-ended':'story-covers-v3/feed-never-ended.webp'
 ,'new-1-es-cost-of-convenience':'story-covers-v3/cost-of-convenience.webp'
 ,'new-2-a1-hospital-visit':'story-covers-v3/hospital-visit.webp'
 ,'new-2-a1-emergency-practice':'story-covers-v3/emergency-practice.webp'
 ,'new-2-a1-weekend-volunteer':'story-covers-v3/weekend-volunteer.webp'
 ,'new-2-a1-missed-practice-screen':'story-covers-v3/missed-practice-screen.webp'
 ,'new-2-a1-shared-computer':'story-covers-v3/shared-computer.webp'
 ,'new-2-a2-perfect-project':'story-covers-v3/perfect-project.webp'
 ,'new-2-a2-missing-permission':'story-covers-v3/missing-permission.webp'
 ,'l3-a2-food-waste':'story-covers-v3/cafeteria-plan.webp'
 ,'new-3-a2-recommendation-letter':'story-covers-v3/recommendation-letter.webp'
 ,'new-3-a2-unsafe-workplace':'story-covers-v3/unsafe-workplace.webp'
 ,'new-3-a2-scholarship-application':'story-covers-v3/scholarship-application.webp'
 ,'new-3-a2-study-screen-balance':'story-covers-v3/study-screen-balance.webp'
 ,'new-3-a2-limited-budget':'story-covers-v3/limited-community-budget.webp'
 ,'new-3-a2-long-term-solution':'story-covers-v3/long-term-solution.webp'
 ,'new-3-a2-first-bell':'story-covers-v3/first-bell.webp'
 ,'new-3-es-conflict-interest':'story-covers-v3/conflict-interest.webp'
 ,'new-3-es-incomplete-consent':'story-covers-v3/incomplete-consent.webp'
 ,'new-2-a2-accessible-sports-day':'story-covers-v3/accessible-sports-day.webp'
 ,'new-2-a2-community-survey':'story-covers-v3/community-survey.webp'
 ,'new-2-a2-sitting-all-afternoon':'story-covers-v3/sitting-all-afternoon.webp'
 ,'new-2-es-answer-behind-answer':'story-covers-v3/answer-behind-answer.webp'
 ,'new-2-es-selective-report':'story-covers-v3/selective-report.webp'
 ,'new-2-es-algorithm-recommendation':'story-covers-v3/algorithm-recommendation.webp'
 ,'new-2-es-confidential-conversation':'story-covers-v3/confidential-conversation.webp'
 ,'new-2-es-late-evidence':'story-covers-v3/late-evidence.webp'
 ,'new-2-es-designed-attention':'story-covers-v3/designed-attention.webp'
 ,'new-3-a1-first-job-interview':'story-covers-v3/first-job-interview.webp'
 ,'new-3-a1-shift-exchange':'story-covers-v3/shift-exchange.webp'
 ,'new-3-a1-safety-rule':'story-covers-v3/safety-rule.webp'
 ,'new-3-a1-week-without-movement':'story-covers-v3/week-without-movement.webp'
 ,'new-3-a1-emergency-team':'story-covers-v3/emergency-team.webp'
 ,'new-3-a1-public-meeting':'story-covers-v3/public-meeting.webp'
 ,'new-3-es-good-intention':'story-covers-v3/good-intention.webp'
 ,'new-3-es-whistleblower-choice':'story-covers-v3/whistleblower-choice.webp'
 ,'new-3-es-biased-selection':'story-covers-v3/biased-selection.webp'
 ,'new-3-es-controls-next-hour':'story-covers-v3/controls-next-hour.webp'
 ,'new-3-es-unanswered-message':'story-covers-v3/unanswered-message.webp'
 ,'new-3-es-winter-stage':'story-covers-v3/winter-stage.webp'
};
const lessonByArc={
 'Unwelcome surprise':'שינוי לא צפוי אינו חייב לגרום לפעולה פזיזה. עצירה, הסתגלות ובקשת עזרה מאפשרות להתמודד עם קושי בלי להסתיר אותו.',
 'Help from a friend':'קבלת עזרה אינה חולשה. עזרה מכבדת אינה עושה את המשימה במקום האחר, אלא נותנת לו ביטחון וכלים להמשיך בעצמו.',
 'Mistake and repair':'טעות קטנה עלולה לגדול כאשר מסתירים אותה. הודאה, תיקון וקבלת אחריות אינן מוחקות מיד את הנזק, אך הן מתחילות לבנות מחדש אמון.',
 'Misunderstanding':'לא נכון לפרש שתיקה או תגובה קצרה בלי לבדוק את העובדות. שאלה מכבדת יכולה למנוע כעס, מבוכה ופגיעה מיותרת.',
 'Discovery':'סקרנות טובה נשענת על פרטים וראיות. במקום למהר למסקנה, הדמויות לומדות לבדוק רמזים ולפעול לאחר שהבינו את משמעותם.',
 'Race against time':'במצב לחוץ ארגון רגוע יעיל יותר מפעולה מהירה ולא מתוכננת. חלוקת משימות ותשומת לב לפרטים יכולות למנוע טעות גדולה.',
 'Second attempt':'כישלון הוא חלק מתהליך למידה. שינוי שיטה, תרגול הדרגתי וניסיון נוסף מאפשרים להתמודד עם מבוכה ולפתח התמדה.',
 'Unexpected ability':'לא נכון לשפוט יכולת לפי עוצמת הקול או הרושם הראשון. הקשבה לתלמיד שקט עשויה לחשוף ידע שהקבוצה כולה זקוקה לו.',
 'Promise under pressure':'אמינות נבחנת דווקא כאשר קיום הבטחה נעשה קשה. הבחירה לעמוד בהתחייבות מחזקת אמון, גם כאשר היא כרוכה בוויתור.',
 'False appearance':'מראה משכנע אינו תחליף לבדיקה. חשוב לחזור למקור, להשוות פרטים ולפרסם תיקון ברור כאשר מתגלה טעות.',
 'Chain reaction':'פעולה קטנה יכולה להשפיע על אנשים נוספים. עצירת הנזק וקבלת אחריות חשובות יותר מהתגוננות או חיפוש תירוצים.',
 'Role reversal':'כל אדם יכול להיות לעיתים מסייע ולעיתים זקוק לעזרה. שיתוף יכולות ובקשה פתוחה לעזרה יוצרים קשר שוויוני וחזק יותר.',
 'Moral dilemma':'לעיתים שתי אפשרויות מגנות על ערכים חשובים אך יוצרות מחירים שונים. החלטה אחראית בודקת מי יושפע, בוחרת בחובה החשובה יותר ומציגה ביושר גם את המחיר שנותר.',
 'Preparation pays off':'תרגול מוקדם והרגלי בטיחות נראים לעיתים שגרתיים, אך הם מאפשרים לפעול בשקט כאשר מגיע רגע אמיתי. לאחר האירוע חוזרים לתרגול ומשפרים את החלק החלש.'
};
const lessonEnByArc={
 'Unwelcome surprise':'An unexpected change need not produce a rushed response. Pausing, adapting, and asking for support make it possible to face difficulty honestly.',
 'Help from a friend':'Accepting help is not weakness. Respectful help does not take over; it gives the learner support and confidence to continue independently.',
 'Mistake and repair':'A small mistake can grow when it is hidden. Admission, repair, and responsibility begin to rebuild trust.',
 'Misunderstanding':'Silence or a brief response should not be judged without checking the facts. A respectful question can prevent unnecessary hurt.',
 'Discovery':'Useful curiosity depends on evidence. The characters learn to examine clues before announcing a conclusion or taking action.',
 'Race against time':'Under pressure, calm organization is more effective than unplanned speed. Sharing tasks and noticing details can prevent a greater mistake.',
 'Second attempt':'Failure is part of learning. A changed method, gradual practice, and a second attempt develop persistence.',
 'Unexpected ability':'Ability should not be judged by volume or first impressions. Listening to an overlooked person may reveal knowledge the whole group needs.',
 'Promise under pressure':'Reliability matters most when keeping a promise becomes difficult. Honoring a commitment protects trust even when it requires a sacrifice.',
 'False appearance':'A convincing appearance is not a substitute for verification. Sources should be checked and errors corrected clearly.',
 'Chain reaction':'A small action can affect people beyond the first moment. Preventing further harm and accepting responsibility matter more than excuses.',
 'Role reversal':'Everyone may sometimes help and sometimes need help. Sharing abilities and asking openly for support create a more equal relationship.',
 'Moral dilemma':'Sometimes two choices protect important values while creating different costs. A responsible decision considers who is affected, protects the stronger duty, and states the remaining cost honestly.',
 'Preparation pays off':'Practice and safety habits can seem routine, but they make calm action possible when a real challenge arrives. Afterward, the group improves the weakest part of the routine.'
};
function finalParentLevel(s,count){
 if(s.group==='ES')return `English level: advanced first-language English track, using the most demanding vocabulary from Lists A–D. The ${count} sentences include precise word choice, implicit motives, controlled complex syntax, and natural shifts in chronology. Simplified English support is available without Hebrew.`;
 if(s.group==='A1')return `רמת האנגלית: קבוצת תמיכה המבוססת על Band II. ${count} המשפטים קצרים וישירים יחסית, סדר האירועים ברור, ומילים שימושיות חוזרות בהקשרים מעט שונים. הכמות והתחביר מותאמים לגיל, אך העלילה עצמה אינה ילדותית.`;
 return `רמת האנגלית: קבוצת ביניים־גבוהה, עם אוצר מילים ישיר ומדורג${s.level===3?' מרשימות A–D':''}. ${count} המשפטים כוללים קשרי זמן, סיבה ותוצאה ומשפטים מורכבים במידה מבוקרת. ${s.level===2?'בסיפורים המתקדמים בכיתה ט׳ מופיע מעט דקדוק מתקדם ורק בהקשר טבעי.':'בכיתה י׳ המבנים המתקדמים משולבים כאשר הם תורמים למשמעות.'}`;
}
function finalParentGoals(s,count,arc){
 if(s.group==='ES')return `English-learning goals: sustain attention across a ${count}-sentence narrative; infer motive and emotion from actions and concrete details; acquire precise vocabulary through meaningful repetition; track cause, consequence, and earlier events; and interpret how the ${arc.en.toLowerCase()} structure builds tension and resolution. Past Perfect or controlled inversion is used only when it clarifies chronology or emphasis.`;
 if(s.group==='A1')return `מטרות לימוד האנגלית: לעקוב בהקשבה ובקריאה אחר רצף של ${count} משפטים; לזהות מי פועל, מה השתנה ומה הייתה התוצאה; לרכוש אוצר מילים שימושי מתוך הקשר; ולחזור על מילים מרכזיות בלי שינון מנותק. החלוקה לחלקי הקראה והתרגום מאפשרים לבדוק הבנה, לשפר שטף ולחבר בין הצליל, המשפט והמשמעות.`;
 return `מטרות לימוד האנגלית: לשמור על הבנה לאורך ${count} משפטים; לזהות קשרי זמן, סיבה ותוצאה; להסיק רגש ומניע מתוך פעולה ופרט; ולהרחיב אוצר מילים ישיר בתוך עלילה. מבנה ${arc.he} מאפשר לתרגל ניבוי, הבנת רמזים וסיכום של נקודת השיא והתוצאה. ההקראה המדורגת תומכת בשטף, והתרגום מיועד לבדיקת הבנה ולא להחלפת הקריאה באנגלית.`;
}
function thematicArc(s,fallback,index){
 const t=(s.id+' '+s.en).toLowerCase();
 // Choose only structures that fit the actual event. Do not rotate to an
 // unrelated structure merely to avoid two neighboring stories sharing an
 // arc; coherence is more important than cosmetic variety.
 if(/conflict[- ]of[- ]interest/.test(t))return 12;
 if(/scholarship[- ]application|volunteer[- ]truth|truth about the volunteer|incomplete[- ]consent/.test(t))return 2;
 if(/sent by mistake|damaged library book|friend who cheated|missing permission|good intention/.test(t))return 2;
 if(/photo|photograph|headline|rumor|anonymous account|selective report|biased selection|false emergency/.test(t))return 9;
 if(/silent[- ]witness/.test(t))return 12;
 if(/answer[- ]behind[- ]answer/.test(t))return 9;
 if(/lost dog|wallet|wrong classroom|missing notebook|school map|hidden water leak|evidence/.test(t))return 4;
 if(/new student|back to school|broken pencil|helping|empty seat|quiet lunch table|hospital visit/.test(t))return 1;
 if(/confidential conversation/.test(t))return 12;
 if(/new glasses|unanswered message|incomplete consent/.test(t))return 3;
 if(/missed practice/.test(t))return 3;
 if(/first job interview|emergency[- ]practice|first aid|safe[- ]bicycle[- ]ride/.test(t))return 13;
 if(/runner|homework he could not explain|perfect homework|perfect project/.test(t))return 6;
 if(/injured captain/.test(t))return 11;
 if(/different kind of strength/.test(t))return 7;
 if(/price of winning/.test(t))return 8;
 if(/final place|water[- ]shortage|captain.*decision/.test(t))return 12;
 if(/emergency[- ]team/.test(t))return 0;
 if(/team|group credit|who did the work|uncredited idea|appearance|captain|unfair team/.test(t))return 7;
 if(/recommendation[- ]letter|private[- ]donation|limited[- ]community[- ]budget/.test(t))return 12;
 if(/l3-es-promise|promise to a friend/.test(t))return 12;
 if(/promise|shift exchange|weekend volunteer/.test(t))return 8;
 if(/community race|accessible[- ]trip|accessible sports day/.test(t))return 0;
 if(/unsafe[- ]workplace/.test(t))return 0;
 if(/whistleblower/.test(t))return 12;
 if(/helmet|bicycle|scooter|ride|rainy walk|emergency|first aid|safety rule/.test(t))return 0;
 if(/phone|video|feed|screen|algorithm|attention|movement|sitting all afternoon|online challenge|controls[- ]next[- ]hour/.test(t))return 10;
 if(/spare seat/.test(t))return 0;
 if(/bird[- ]nest|nest near the window/.test(t))return 0;
 if(/river after the storm/.test(t))return 10;
 if(/safety[- ]rule|plant|garden|nest|class pet|playground|bottle|food project|food[- ]waste|river|energy|water[- ]shortage|community survey|park|library|transport|budget|long[- ]term solution|repair café|neighborhood[- ]plan|public[- ]meeting/.test(t))return 4;
 return fallback;
}
window.STORIES.forEach(s=>{
 const key=s.level+'-'+s.group,i=counters[key]||0; counters[key]=i+1;
 const explicitArc={'new-3-a2-first-bell':1,'new-3-es-unanswered-message':3,'new-3-es-winter-stage':11};
 const fallback=(i+(s.level-1)*4+(s.group==='A2'?2:s.group==='ES'?5:0))%structures.length;
 let arcIndex=explicitArc[s.id]??thematicArc(s,fallback,i);
 previousArc[key]=arcIndex;
 const meta=narrativeMetadata[s.id];
 const baseArc=structures[arcIndex],arc=meta?{en:meta.arcEn,he:meta.arcHe}:baseArc;
 s.plotStructureEn=arc.en;s.plotStructureHe=arc.he;
 if(!explicit.has(s.id))s.scenes=rebuild(s,baseArc);
 if(narrativeRevisions[s.id])s.scenes=narrativeRevisions[s.id];
 const corrections=sceneCorrections[s.id];
 if(corrections)Object.entries(corrections).forEach(([index,scene])=>{s.scenes[Number(index)]=scene});
 // Every tappable unit is a short constituent. A small set of high-value focus
 // adverbs may stand alone; support text is aligned to the same unit.
 s.scenes=s.scenes.map(scene=>pedagogicalScene(normalizeSceneEnglish(scene),s.group));
 // Added-story cards originally reused the final sentence as their premise,
 // revealing the solution before the reader opened the story. Build a concise
 // spoiler-free premise from the two story-specific setup scenes instead. The
 // three fully authored newcomer stories already have tailored card copy.
 if(s.id.startsWith('new-')&&!explicit.has(s.id)){
  s.descEn=s.scenes.slice(0,2).map(scene=>scene.map(part=>part[0]).join(' ')).join(' ');
  if(s.group!=='ES')s.descHe=s.scenes.slice(0,2).map(scene=>scene[0]?.[2]||'').join(' ');
 }
 // The rewritten sequence has one verified visual anchor. Old episode images
 // are removed when they no longer describe the rewritten sequence.
 if(s.sceneImages&&s.sceneImages.length){s.image=s.sceneImages[0]||s.image;s.sceneImages=null}
 if(upgradedCovers[s.id])s.image=upgradedCovers[s.id];
 s.imageContext=`Cover anchored to the original story event: ${s.descEn}`;
 const count=s.scenes.length;
 s.parentLevel=finalParentLevel(s,count);
 s.parentPedagogy=finalParentGoals(s,count,arc);
 if(s.group==='ES'){
  s.parentSummaryEn=s.descEn+' This summary presents the situation without revealing the decisive moment or outcome.';
  s.parentLessonEn=lessonEnByArc[arc.en];
  s.parentSummary='';s.parentLesson='';
 }else{
  s.parentSummary=(s.descHe||`הסיפור עוסק ב${s.he}.`)+' התקציר מציג את נקודת המוצא בלבד ואינו מגלה מראש את רגע ההכרעה ואת תוצאתו.';
  s.parentLesson=meta?.lesson||lessonByArc[arc.en];
 }
});

// The parent guide is rendered only after every final story field above exists.
// This keeps the guide synchronized with the completed rewrite rather than with
// an earlier draft of the catalogue.
if(typeof document!=='undefined'&&document.getElementById('parentsCard')){
 const style=document.createElement('style');
 style.textContent='.parents-card{max-height:min(82dvh,760px);overflow:auto;direction:rtl;text-align:right;font-family:Heebo,Arial,sans-serif}.parents-card h2,.parents-card h3,.parents-card p{direction:rtl;text-align:right;unicode-bidi:plaintext}.parents-card h3{margin:19px 0 5px;color:var(--cyan);font-size:1rem}.parents-card p{margin:0;line-height:1.7;white-space:normal;overflow-wrap:break-word;word-break:normal}.parents-card.pedagogy-en{direction:ltr;text-align:left;font-family:Andika,system-ui,sans-serif}.parents-card.pedagogy-en h2,.parents-card.pedagogy-en h3,.parents-card.pedagogy-en p{direction:ltr;text-align:left;unicode-bidi:plaintext}';
 document.head.appendChild(style);
 const levelTitle=document.createElement('h3'),levelText=document.createElement('p');
 levelTitle.id='levelTitle';levelText.id='parentLevel';
 document.getElementById('pedagogyTitle').before(levelTitle,levelText);
 setTimeout(()=>{
  const story=window.STORIES.find(s=>s.id===new URLSearchParams(location.search).get('id'))||window.STORIES[0];
  const card=document.getElementById('parentsCard'),es=story.group==='ES';
  card.classList.toggle('pedagogy-en',es);card.dir=es?'ltr':'rtl';card.lang=es?'en':'he';
  document.getElementById('parentsBtn').textContent=es?'Parents':'הורים';
  document.getElementById('parentsTitle').textContent=es?'FOR PARENTS':'להורים';
  document.getElementById('summaryTitle').textContent=es?'SHORT SUMMARY':'תקציר קצר';
  document.getElementById('lessonTitle').textContent=es?'EDUCATIONAL MESSAGE':'המסר החינוכי';
  levelTitle.textContent=es?'ENGLISH LEVEL':'רמת האנגלית';
  document.getElementById('pedagogyTitle').textContent=es?'ENGLISH-LEARNING GOALS':'מטרות פדגוגיות בלימוד האנגלית';
  document.getElementById('parentSummary').textContent=es?story.parentSummaryEn:story.parentSummary;
  document.getElementById('parentLesson').textContent=es?story.parentLessonEn:story.parentLesson;
  levelText.textContent=story.parentLevel;
  document.getElementById('parentPedagogy').textContent=story.parentPedagogy;
 },0);
}
})();
