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
  [['Noam arrived at a new school,','נועם הגיע לבית ספר חדש,'],['and kept his backpack on','והשאיר את התיק על גבו'],['during break.','בזמן ההפסקה.']],
  [['He watched a ball game,','הוא צפה במשחק כדור,'],['started toward the players,','התחיל ללכת לעבר השחקנים,'],['then stopped beside the library.','ואז נעצר ליד הספרייה.']],
  [['Ari noticed him standing alone,','ארי הבחין בו עומד לבדו,'],['and rolled the ball toward him.','וגלגל את הכדור לעברו.']],
  [['“You can play with us,”','״אתה יכול לשחק איתנו,״'],['Ari said.','אמר ארי.']],
  [['“I do not know the rules,”','״אני לא מכיר את הכללים,״'],['Noam admitted.','הודה נועם.']],
  [['His first pass rolled past Ari,','המסירה הראשונה שלו התגלגלה מעבר לארי,'],['and Noam stepped back.','ונועם נסוג לאחור.']],
  [['“Aim at my shoes,” Ari said.','״כוון לנעליים שלי,״ אמר ארי.'],['Noam tried again,','נועם ניסה שוב,'],['and the group called his name.','וחברי הקבוצה קראו בשמו.']],
  [['At lunch, Noam pointed','בארוחת הצהריים נועם הצביע'],['to an empty chair','על כיסא פנוי'],['for another new student.','עבור תלמיד חדש אחר.'],['“You can sit with us.”','״אתה יכול לשבת איתנו.״']]
 ],
 'l1-a1-lost-dog':[
  [['Leah and Tamar found a wet dog','לאה ותמר מצאו כלב רטוב'],['beside the school gate.','ליד שער בית הספר.']],
  [['Its collar had no phone number,','על הקולר שלו לא היה מספר טלפון,'],['and one paw was hurt.','ואחת מכפותיו הייתה פצועה.']],
  [['“I want to stay with him,” Leah said.','״אני רוצה להישאר איתו,״ אמרה לאה.']],
  [['“We can help him,','״אנחנו יכולות לעזור לו,'],['but we must tell an adult,”','אבל אנחנו חייבות לספר למבוגר,״'],['Tamar replied.','השיבה תמר.']],
  [['“You hold the umbrella,” she added,','״את תחזיקי את המטרייה,״ הוסיפה,'],['“and I will call the guard.”','״ואני אתקשר לשומר.״']],
  [['The guard brought water','השומר הביא מים'],['and called the animal rescue center.','והתקשר למרכז להצלת בעלי חיים.']],
  [['While they waited, the girls spoke softly,','בזמן שהמתינו הבנות דיברו בשקט,'],['and the dog stopped shaking.','והכלב הפסיק לרעוד.']],
  [['When the owner arrived, she said,','כאשר בעלת הכלב הגיעה, היא אמרה:'],['“You kept him safe, and you stayed safe too.”','״שמרתן עליו, וגם שמרתן על עצמכן.״']],
  [['The next day,','למחרת,'],['Leah wrote the rescue center’s number','לאה כתבה את המספר של מרכז ההצלה'],['inside her school notebook.','בתוך מחברת בית הספר שלה.']]
 ],
 'l1-a1-back-to-school':[
  [['Before his injury, Eli often carried','לפני פציעתו אלי נשא לעיתים קרובות'],['books for other students.','ספרים עבור תלמידים אחרים.']],
  [['He returned to school','הוא חזר לבית הספר'],['after several weeks at home.','לאחר כמה שבועות בבית.']],
  [['At the stairs,','ליד המדרגות,'],['he gripped the rail.','הוא אחז במעקה.'],['His heavy bag','התיק הכבד שלו'],['hung from one shoulder.','היה תלוי על כתף אחת.']],
  [['“I can carry it,” Eli insisted,','״אני יכול לשאת אותו,״ התעקש אלי,'],['although he nearly lost his balance.','אף שכמעט איבד את שיווי משקלו.']],
  [['Noa stopped below him.','נועה עצרה מתחתיו.'],['“You carry the notebook;','״אתה תיקח את המחברת;'],['we will carry the books.”','אנחנו ניקח את הספרים.״']],
  [['Eli recognized words he often used.','אלי זיהה מילים שנהג לומר.'],['He smiled','הוא חייך'],['and handed her two books.','ומסר לה שני ספרים.']],
  [['In class, three classmates placed','בכיתה שלושה חברים לכיתה הניחו'],['their lesson notes','את הסיכומים שלהם'],['on Eli’s desk.','על שולחנו של אלי.']],
  [['“I missed more than lessons,” Eli said','״התגעגעתי ליותר מאשר לשיעורים,״ אמר אלי'],['when a crooked science drawing','כאשר ציור מדעי עקום'],['made everyone laugh.','הצחיק את כולם.']],
  [['At break, his friends walked beside him','בהפסקה חבריו הלכו לצדו'],['without pulling him or rushing him.','בלי למשוך אותו ובלי לזרז אותו.']],
  [['A week later,','שבוע לאחר מכן,'],['Eli reached the top stair','אלי הגיע למדרגה העליונה'],['and waited there','והמתין שם'],['for the friends','לחברים'],['who had waited for him.','שהמתינו לו.']]
 ],
 'l1-a2-no-phone':[
  [['On Monday, the class agreed','ביום שני הכיתה הסכימה'],['to place every phone','להניח את כל הטלפונים'],['in a closed box','בקופסה סגורה'],['until the final bell.','עד הצלצול האחרון.']],
  [['“I will not last ten minutes,” Omer joked,','״אני לא אחזיק מעמד עשר דקות,״ התבדח עומר,'],['reaching toward his empty pocket.','ושלח את ידו אל הכיס הריק.']],
  [['At the first break,','בהפסקה הראשונה,'],['they stood together,','הם עמדו יחד,'],['but nobody knew what to say.','אבל איש לא ידע מה לומר.']],
  [['Maya bounced a paper ball and asked,','מאיה הקפיצה כדור נייר ושאלה:'],['“What did we do before screens?”','״מה עשינו לפני המסכים?״']],
  [['“We talked,” Lior replied.','״דיברנו,״ השיב ליאור.'],['“You start.”','״את תתחילי.״']],
  [['Maya invented a question game,','מאיה המציאה משחק שאלות,'],['and everyone added one rule.','וכולם הוסיפו כלל אחד.']],
  [['When two students argued,','כאשר שני תלמידים התווכחו,'],['the group had to listen instead of checking phones.','הקבוצה נאלצה להקשיב במקום לבדוק את הטלפונים.']],
  [['“I expected to miss my messages,”','״ציפיתי שאתגעגע להודעות שלי,״'],['Omer said,','אמר עומר,'],['“but I heard all of you.”','״אבל שמעתי את כולכם.״']],
  [['The next day, the phones were returned,','למחרת הטלפונים הוחזרו,'],['but during break','אבל בזמן ההפסקה'],['the students placed them screen-down','התלמידים הניחו אותם כשהמסכים כלפי מטה'],['and continued the game.','והמשיכו במשחק.']]
 ],
 'l1-a2-last-runner':[
  [['Yoni finished last','יוני סיים אחרון'],['in every practice run,','בכל ריצת אימון,'],['and the stopwatch beep','וצפצוף שעון העצר'],['echoed behind him.','הדהד מאחוריו.']],
  [['After another slow lap,','לאחר עוד הקפה אטית,'],['he pulled at his shoelace and turned away.','הוא משך בשרוך נעלו והסתובב.']],
  [['“I slow everyone down,”','״אני מאט את כולם,״'],['he told the coach.','הוא אמר למאמן.']],
  [['The coach lifted the stopwatch','המאמן הרים את שעון העצר'],['and said,','ואמר:'],['“You are racing yesterday’s time,','״אתה מתחרה בזמן של אתמול,'],['not the other runners.”','לא ברצים האחרים.״']],
  [['Dani stepped forward.','דני צעד קדימה.'],['“We can train together','״אנחנו יכולים להתאמן יחד'],['for one lap.”','במשך הקפה אחת.״']],
  [['During the first week,','במהלך השבוע הראשון,'],['Yoni’s time did not improve,','הזמן של יוני לא השתפר,'],['and he nearly stopped trying.','והוא כמעט הפסיק לנסות.']],
  [['On a rainy morning,','בבוקר גשום,'],['Dani waited for him,','דני המתין לו,'],['and Yoni finished three seconds faster.','ויוני סיים מהר יותר בשלוש שניות.']],
  [['On race day,','ביום המרוץ,'],['Yoni fell behind','יוני נשאר מאחור'],['after the first turn,','לאחר הפנייה הראשונה,'],['but he heard the finishers cheering.','אבל הוא שמע את המסיימים מעודדים.']],
  [['“Keep going—you are almost there!”','״המשך—אתה כמעט שם!״'],['they called.','הם קראו.']],
  [['Yoni crossed the line last,','יוני חצה את הקו אחרון,'],['looked at the stopwatch,','הביט בשעון העצר,'],['and whispered, “My best time.”','ולחש: ״הזמן הטוב ביותר שלי.״']]
 ],
 'l1-a2-clean-playground':[
  [['After the school fair,','לאחר היריד בבית הספר,'],['plastic cups and bottles','כוסות ובקבוקים מפלסטיק'],['covered the playground.','כיסו את מגרש המשחקים.']],
  [['A cup blocked the rain drain,','כוס חסמה את פתח הניקוז,'],['and a bird pecked','וציפור ניקרה'],['at a plastic ring.','בטבעת פלסטיק.']],
  [['The students filled two bags quickly,','התלמידים מילאו במהירות שתי שקיות,'],['but a strong wind','אבל רוח חזקה'],['blew light cups out again.','העיפה שוב כוסות קלות החוצה.']],
  [['“Cleaning once is not enough,” Neta said.','״לא מספיק לנקות פעם אחת,״ אמרה נטע.']],
  [['They closed the large bins,','הם סגרו את הפחים הגדולים,'],['then separated paper and plastic.','ואחר כך הפרידו נייר ופלסטיק.']],
  [['Wearing gloves,','בעודם עוטים כפפות,'],['they cleared the drain','הם פינו את פתח הניקוז'],['and cut open the plastic rings.','וגזרו את טבעות הפלסטיק.']],
  [['The class counted seventy-three cups','הכיתה ספרה שבעים ושלוש כוסות'],['from one afternoon.','מאחר צהריים אחד.']],
  [['They showed the number','הם הציגו את המספר'],['to the event committee','לוועדת האירועים'],['and proposed refill stations.','והציעו תחנות מילוי.']],
  [['Before the next fair,','לפני היריד הבא,'],['students placed closed recycling bins','התלמידים הציבו פחי מחזור סגורים'],['beside every drink table.','ליד כל שולחן שתייה.']],
  [['Another gust crossed the playground,','משב רוח נוסף עבר במגרש המשחקים,'],['but the drain remained clear.','אבל פתח הניקוז נשאר פנוי.']],
  [['One cup landed near a bench,','כוס אחת נחתה ליד ספסל,'],['and a younger student','ותלמיד צעיר יותר'],['picked it up','הרים אותה'],['before Neta reached it.','לפני שנטע הגיעה אליה.']]
 ],
 'l1-es-wrong-message':[
  [['Eitan typed a private joke','Eitan wrote a joke for one friend'],['about Tal’s nervous history presentation.','about Tal sounding nervous during a presentation.']],
  [['He selected the class group','He chose the class group'],['instead of Noa’s name.','instead of his friend Noa.']],
  [['The message disappeared when he deleted it,','He removed the message quickly,'],['but a screenshot had already appeared.','but someone had already copied it.']],
  [['Laughing emojis filled the screen,','Students sent laughing pictures,'],['and Tal left the group.','and Tal left the online group.']],
  [['“Say your phone changed the words,”','A friend suggested blaming the phone,'],['one friend suggested.','instead of telling the truth.']],
  [['Eitan looked at the screenshot','Eitan looked at the copied message'],['and rejected the excuse.','and decided not to make an excuse.']],
  [['“I wrote it.','Eitan admitted that he wrote the joke.'],['It was cruel,','He said that it was hurtful'],['and I sent it here by mistake.”','and that he sent it to the group by mistake.']],
  [['He apologized to Tal directly','He said sorry to Tal in private'],['without asking for immediate forgiveness.','and did not demand quick forgiveness.']],
  [['The group administrator removed the screenshot,','The group leader removed the copied message,'],['and Eitan asked others not to forward it.','and Eitan asked people not to share it.']],
  [['Tal answered the next afternoon:','Tal replied on the following day.'],['“I need time,','He said that he still needed time'],['but I read your apology.”','but had read Eitan’s apology.']],
  [['During Tal’s next presentation,','When Tal gave another presentation,'],['Eitan did not fill a pause','Eitan did not make a joke during a pause'],['with another joke;','and waited quietly.'],['he waited, and Tal continued.','Tal then continued speaking.']]
 ],
 'l1-es-appearance':[
  [['Daniel’s facial birthmark','Daniel had a visible mark on his face'],['was the first thing','and people often noticed it first'],['some classmates noticed about him.','before learning anything about him.']],
  [['For a greenhouse project,','During a project in the school greenhouse,'],['they assigned him the label sheets','the group gave Daniel a very small task'],['without asking what he could do.','without asking about his skills.']],
  [['Then the temperature sensor','Then the tool that measured temperature'],['reported an impossible reading','showed a result that could not be correct'],['as the seedlings began to wilt.','while the young plants became weak.']],
  [['One confident teammate wanted','One confident student wanted'],['to replace the entire device.','to replace the whole measuring tool.']],
  [['Daniel compared the earlier readings','Daniel examined the earlier numbers'],['with the irrigation times.','and compared them with watering times.']],
  [['“Disconnect the power first,” he said.','Daniel asked the group to turn off the power first.'],['“Then I can check the wire safely.”','Then he could examine the wire safely.']],
  [['He found a damp connector','He found a wet connection'],['and a crack in its wire.','and a broken place in its wire.']],
  [['The readings had jumped','The numbers had changed suddenly'],['whenever the irrigation system started.','whenever the watering system began.']],
  [['The group dried the connector,','The students dried the connection,'],['replaced the wire,','put in a new wire,'],['and watched the reading settle.','and saw the number return to normal.']],
  [['The fan restarted','The fan began working again'],['before the seedlings were damaged.','before the young plants were harmed.']],
  [['“We gave you the smallest job','A classmate admitted that the group had underestimated Daniel'],['before we knew your skills,”','before learning what he could do'],['a classmate admitted.','and apologized directly.']],
  [['For the next project,','During the following project,'],['Daniel chose to test the system','Daniel chose to examine the system'],['and asked Leila to explain the data.','and invited Leila to explain the results.']]
 ],
 'l1-es-school-garden':[
  [['A dry, stony corner','A dry place full of stones'],['behind the school','stood behind the school'],['had remained empty for years.','and had not been used for years.']],
  [['Leila imagined bright flowers,','Leila wanted the garden to have colorful flowers,'],['while Amir worried','while Amir was concerned'],['about the school’s limited water.','about the small amount of water available.']],
  [['Their first sketch included','Their first drawing showed'],['rows of thirsty plants.','many plants that needed a lot of water.']],
  [['The caretaker pointed out','The school caretaker explained'],['that the hose could not reach','that the water pipe did not reach the area'],['during the summer restrictions.','when summer rules limited water use.']],
  [['When they tested the soil,','When they poured water onto the ground,'],['the water vanished between the stones.','it quickly disappeared between the stones.']],
  [['Amir noticed a condensation pipe','Amir saw a pipe carrying water from an air conditioner'],['that dripped every afternoon.','and noticed that it dripped each afternoon.']],
  [['For one week,','During one week,'],['they measured the unused water','they measured water that would otherwise be wasted'],['instead of guessing.','instead of making an unsupported estimate.']],
  [['Leila designed a curved channel','Leila drew a curved path for the water'],['leading to a covered tank.','that led to a closed container.']],
  [['Amir selected native flowers,','Amir chose local flowers'],['mulch,','and material that protected the soil'],['and two areas of shade.','as well as two shaded areas.']],
  [['Some students wanted more color;','Some students wanted the garden to be more colorful,'],['others wanted almost no watering.','while others wanted to use almost no water.']],
  [['The final plan combined','The final plan included'],['a bright stone path','a colorful path made of stones'],['with drought-resistant plants.','and plants that needed little water.']],
  [['During the first hot week,','During the first very hot week,'],['one seedling wilted','one young plant became weak'],['because an irrigation hole was blocked.','because one watering hole was closed.']],
  [['They cleared the hole,','They opened the watering hole again,'],['adjusted the evening schedule,','changed the evening watering time,'],['and the plant recovered.','and helped the plant become healthy again.']],
  [['When birds visited the garden,','When birds came to the completed garden,'],['Leila and Amir began their next design','Leila and Amir started another plan'],['with both a sketch','using both a drawing'],['and a water estimate.','and an estimate of water use.']]
 ],
 'l2-a1-wallet':[
  [['Rina noticed a wallet','רינה הבחינה בארנק'],['under a bench','מתחת לספסל'],['at the bus stop.','בתחנת האוטובוס.']],
  [['Her bus arrived','האוטובוס שלה הגיע'],['just as she picked it up.','בדיוק כשהרימה אותו.']],
  [['She saw money and cards inside,','היא ראתה בתוכו כסף וכרטיסים,'],['but nobody nearby claimed it.','אבל איש בסביבה לא טען שהוא שלו.']],
  [['Rina let the bus leave','רינה הניחה לאוטובוס לנסוע'],['and walked to the security desk.','והלכה לעמדת האבטחה.']],
  [['The guard recorded the wallet','המאבטח תיעד את הארנק'],['and called the station office.','והתקשר למשרד התחנה.']],
  [['A worried man returned','אדם מודאג חזר'],['to the security desk','לעמדת האבטחה'],['and described the wallet','ותיאר את הארנק'],['before the guard showed it.','לפני שהמאבטח הראה לו אותו.']],
  [['He named the cards inside,','הוא ציין אילו כרטיסים היו בפנים,'],['so the guard returned it.','ולכן המאבטח החזיר לו אותו.']],
  [['The owner offered Rina money,','בעל הארנק הציע לרינה כסף,'],['but she shook her head.','אבל היא הנידה בראשה.']],
  [['She caught the next bus','היא עלתה על האוטובוס הבא'],['and arrived home twenty minutes late.','והגיעה הביתה באיחור של עשרים דקות.']],
  [['The next afternoon,','למחרת אחר הצהריים,'],['a younger child found a key,','ילד צעיר יותר מצא מפתח,'],['and Rina showed him','ורינה הראתה לו'],['the same security desk.','את אותה עמדת אבטחה.']]
 ],
 'l2-a1-helping-neighbor':[
  [['An orange rolled down the stairs','תפוז התגלגל במורד המדרגות'],['and stopped beside Yaara’s shoe.','ונעצר ליד הנעל של יערה.']],
  [['Mr. Cohen stood above her','מר כהן עמד מעליה'],['with a torn shopping bag','עם שקית קניות קרועה'],['and one sore shoulder.','ועם כתף כואבת.']],
  [['“I can carry it,” he said,','״אני יכול לשאת אותה,״ אמר,'],['but the full bag','אבל השקית המלאה'],['pulled at his arm.','משכה את זרועו.']],
  [['Yaara lifted both bags','יערה הרימה את שתי השקיות'],['without asking,','בלי לשאול,'],['and Mr. Cohen stepped back.','ומר כהן צעד לאחור.']],
  [['“Please ask me first,” he said.','״בבקשה תשאלי אותי קודם,״ אמר.'],['“I can still carry','״אני עדיין יכול לשאת'],['the light bag.”','את השקית הקלה.״']],
  [['Yaara put the bags down','יערה הניחה את השקיות'],['and asked,','ושאלה:'],['“Which bag do you want me to take?”','״איזו שקית אתה רוצה שאקח?״']],
  [['He gave her the bottles','הוא נתן לה את הבקבוקים'],['and kept the bread and eggs.','והשאיר אצלו את הלחם והביצים.']],
  [['Shai held the stair door','שי החזיק את דלת חדר המדרגות'],['while Mr. Cohen climbed','בזמן שמר כהן עלה'],['at his own pace.','בקצב שלו.']],
  [['Together, they made','יחד הם הכינו'],['a Friday schedule','לוח עזרה לימי שישי'],['after asking what help he wanted.','לאחר ששאלו איזו עזרה הוא רוצה.']],
  [['Mr. Cohen added,','מר כהן הוסיף:'],['“Small repairs—ask me,”','״תיקונים קטנים—פנו אליי,״'],['below the students’ names.','מתחת לשמות התלמידים.']],
  [['The next Friday,','ביום שישי הבא,'],['Yaara carried the bottles,','יערה נשאה את הבקבוקים,'],['and he fixed her bicycle light.','והוא תיקן את פנס האופניים שלה.']]
 ],
 'l2-a1-team-place':[
  [['Coach Eyal asked the captains','המאמן אייל ביקש מראשי הקבוצות'],['to choose five players','לבחור חמישה שחקנים'],['for a practice game.','למשחק אימון.']],
  [['Amit raised his hand,','עמית הרים את ידו,'],['but Ron chose','אבל רון בחר'],['the taller boys first.','קודם בבנים הגבוהים יותר.']],
  [['Amit rarely scored,','עמית קלע לעיתים רחוקות,'],['so he sat beside the coach','ולכן ישב ליד המאמן'],['with the tactics board.','עם לוח התכנון.']],
  [['The other team scored','הקבוצה השנייה קלעה'],['three times','שלוש פעמים'],['from the same left corner.','מאותה פינה שמאלית.']],
  [['Amit noticed that number seven','עמית הבחין ששחקן מספר שבע'],['stepped back before every pass.','צעד לאחור לפני כל מסירה.']],
  [['He leaned toward Coach Eyal.','הוא רכן לעבר המאמן אייל.'],['“I know where','״אני יודע לאן'],['the next pass will go.”','תלך המסירה הבאה.״']],
  [['The coach called a timeout','המאמן ביקש פסק זמן'],['and handed Amit the marker.','והושיט לעמית את הטוש.']],
  [['Amit drew one line.','עמית צייר קו אחד.'],['“Ron, stand here.','״רון, תעמוד כאן.'],['I will watch number seven.”','אני אשמור על מספר שבע.״']],
  [['Ron frowned,','רון קימט את מצחו,'],['but moved to the marked place.','אבל עבר למקום המסומן.']],
  [['When number seven','כאשר שחקן מספר שבע'],['stepped back again,','צעד שוב לאחור,'],['Amit shouted, “Left!”','עמית צעק: ״שמאלה!״']],
  [['Ron stopped the pass,','רון עצר את המסירה,'],['and the coach sent Amit','והמאמן שלח את עמית'],['onto the court.','אל המגרש.']],
  [['Amit did not force a shot;','עמית לא ניסה לזרוק בכוח;'],['he passed to the open player.','הוא מסר לשחקן הפנוי.']],
  [['At the next practice,','באימון הבא,'],['Ron handed Amit the marker','רון הושיט לעמית את הטוש'],['and asked, “What do you see?”','ושאל: ״מה אתה רואה?״']]
 ],
 'l2-a2-photo-spread':[
  [['A cropped photograph of Yael','תמונה חתוכה של יעל'],['appeared in the class group','הופיעה בקבוצה הכיתתית'],['during break.','בזמן ההפסקה.']],
  [['It showed her eyes closed,','בתמונה נראו עיניה עצומות,'],['with the words','עם המילים'],['“Sleeping through science.”','״ישנה בשיעור מדעים.״']],
  [['Laughing emojis arrived,','סמלי צחוק הופיעו,'],['and Amir’s thumb rested','והאגודל של אמיר נח'],['on “Forward.”','על ״העבר״.']],
  [['Neta noticed yellow safety goggles','נטע הבחינה במשקפי מגן צהובים'],['at the edge of the picture.','בקצה התמונה.']],
  [['“This came from our experiment,”','״זה הגיע מהניסוי שלנו,״'],['she said.','אמרה.'],['“Show us the original.”','״תראו לנו את התמונה המקורית.״']],
  [['The full photograph showed Yael','התמונה המלאה הראתה את יעל'],['sneezing beside','מתעטשת ליד'],['a bubbling model volcano.','דגם הר געש מבעבע.']],
  [['Amir lowered his phone.','אמיר הוריד את הטלפון שלו.'],['“I almost shared something false.”','״כמעט שיתפתי דבר לא נכון.״']],
  [['He posted the full picture','הוא פרסם את התמונה המלאה'],['and a correction','ותיקון'],['in every class group.','בכל קבוצה כיתתית.']],
  [['Then he asked classmates','אחר כך הוא ביקש מחבריו לכיתה'],['to delete the cropped copy','למחוק את העותק החתוך'],['instead of forwarding it.','במקום להעביר אותו.']],
  [['Yael read his apology,','יעל קראה את ההתנצלות שלו,'],['but did not smile','אבל לא חייכה'],['or answer at once.','ולא ענתה מיד.']],
  [['At the next lab,','בשיעור המעבדה הבא,'],['Amir showed her the team photo','אמיר הראה לה את תמונת הצוות'],['and waited for permission','והמתין לרשותה'],['before posting it.','לפני שפרסם אותה.']]
 ],
 'l2-a2-cheating':[
  [['During a difficult math test,','במהלך מבחן קשה במתמטיקה,'],['Omer saw Gil copy','עומר ראה את גיל מעתיק'],['one of his answers.','אחת מתשובותיו.']],
  [['Omer covered his paper,','עומר כיסה את הדף שלו,'],['but Gil had already copied','אבל גיל כבר העתיק'],['the last two lines.','את שתי השורות האחרונות.']],
  [['After class,','לאחר השיעור,'],['the teacher asked both boys','המורה ביקשה משני הבנים'],['to stay.','להישאר.']],
  [['“You used the same unusual method','״השתמשתם באותה שיטה לא רגילה'],['and made the same error,”','ועשיתם אותה טעות,״'],['she said.','אמרה.']],
  [['Gil whispered,','גיל לחש:'],['“Tell her we practiced it together.”','״תגיד לה שתרגלנו את זה יחד.״']],
  [['Omer remembered','עומר נזכר'],['how Gil had helped him study','כיצד גיל עזר לו ללמוד'],['and looked at the floor.','והביט ברצפה.']],
  [['“I will not lie for you,”','״אני לא אשקר למענך,״'],['Omer said.','אמר עומר.'],['“Tell her before she returns.”','״ספר לה לפני שהיא חוזרת.״']],
  [['Gil waited','גיל המתין'],['until the teacher opened the door.','עד שהמורה פתחה את הדלת.']],
  [['Then he said,','ואז אמר:'],['“I copied Omer’s answer.','״העתקתי את התשובה של עומר.'],['He did not help me.”','הוא לא עזר לי.״']],
  [['Gil’s test was cancelled,','המבחן של גיל נפסל,'],['and he had to take','והוא נאלץ לעשות'],['a new one alone.','מבחן חדש לבדו.']],
  [['Omer did not excuse him,','עומר לא הצדיק אותו,'],['but offered to study together','אבל הציע ללמוד יחד'],['after school.','לאחר הלימודים.']],
  [['The next week,','בשבוע הבא,'],['Gil closed his notes','גיל סגר את הסיכומים שלו'],['before the practice quiz','לפני הבוחן לתרגול'],['and asked Omer','וביקש מעומר'],['to explain one problem.','להסביר תרגיל אחד.']]
 ],
 'l2-a2-injured-captain':[
  [['Before the accident,','לפני התאונה,'],['Ben led every warm-up','בן הוביל כל חימום'],['and carried the tactics board.','ונשא את לוח התכנון.']],
  [['After a cycling crash,','לאחר תאונת אופניים,'],['he recovered at home','הוא החלים בבית'],['for two months.','במשך חודשיים.']],
  [['At first,','בהתחלה,'],['his teammates sent messages','חבריו לנבחרת שלחו הודעות'],['after every practice.','לאחר כל אימון.']],
  [['Soon the messages became shorter,','עד מהרה ההודעות התקצרו,'],['and Ben stopped asking questions.','ובן הפסיק לשאול שאלות.']],
  [['During one video call,','במהלך שיחת וידאו אחת,'],['the phone faced the ceiling','הטלפון פנה אל התקרה'],['instead of the court.','במקום אל המגרש.']],
  [['Ben watched for a minute,','בן צפה במשך דקה,'],['then left the call.','ואז עזב את השיחה.']],
  [['Lior noticed his name disappear','ליאור הבחינה ששמו נעלם'],['and moved the phone','והעבירה את הטלפון'],['to the bench.','אל הספסל.']],
  [['“We need your eyes','״אנחנו צריכים את העיניים שלך'],['on our defense,”','על ההגנה שלנו,״'],['she told him.','אמרה לו.']],
  [['Ben saw that the left side','בן ראה שהצד השמאלי'],['opened whenever','נפתח בכל פעם'],['the center moved forward.','שהשחקן המרכזי התקדם.']],
  [['He sent one short instruction,','הוא שלח הוראה קצרה אחת,'],['and the team stopped','והנבחרת עצרה'],['the next attack.','את ההתקפה הבאה.']],
  [['Later, Ben admitted','בהמשך בן הודה'],['that he also needed class notes','שגם הוא זקוק לסיכומי שיעור'],['and help with homework.','ולעזרה בשיעורי הבית.']],
  [['The teammates divided the work:','חברי הנבחרת חילקו את העבודה:'],['clips, notes, calls','סרטונים, סיכומים, שיחות'],['and short visits.','וביקורים קצרים.']],
  [['On his first day back,','ביום הראשון לאחר שחזר,'],['Ben entered the gym slowly','בן נכנס לאולם לאט'],['with one crutch.','בעזרת קב אחד.']],
  [['He handed Lior the whistle,','הוא הושיט לליאור את המשרוקית,'],['took the tactics board','לקח את לוח התכנון'],['and said,','ואמר:'],['“Let’s lead this together.”','״בואי נוביל את זה יחד.״']]
 ],
 'l2-es-strength':[
  [['Some classmates noticed Sam’s visible facial difference before they learned what he could do.','Some students noticed a visible difference in Sam’s face before they learned about his abilities.']],
  [['During science club, they gave him the label sheet while they built the circuit.','They gave Sam a small paperwork task while they made an electrical system.']],
  [['Sam read the red safety card and asked where the emergency switch was.','Sam read the safety instructions and asked where the power could be stopped in an emergency.']],
  [['One student shrugged. “We will not need it.”','A student thought the emergency switch would not be needed.']],
  [['Minutes later, a beaker tipped, and water ran toward the power strip.','Soon a glass container fell and water moved toward the electrical connection.']],
  [['A student reached for a cloth, but Sam called, “Step back—do not touch it.”','Someone tried to clean it, but Sam told everyone to move away and not touch it.']],
  [['He pointed the teacher toward the emergency switch and counted every student.','Sam showed the teacher the emergency switch and made sure every student was there.']],
  [['The teacher cut the power before the water reached the cables.','The teacher stopped the electricity before the water reached the wires.']],
  [['Nobody spoke until the teacher said the room was safe.','Everyone waited quietly until the teacher said there was no danger.']],
  [['Sam explained the rule calmly, without trying to embarrass anyone.','Sam explained the safety rule calmly and did not try to make anyone feel ashamed.']],
  [['“We gave you the smallest job,” a classmate admitted.','A classmate admitted that the group had given Sam the least important task.']],
  [['At the next meeting, the group asked Sam to lead the safety check.','At the next science meeting, the students asked Sam to check safety before they began.']],
  [['He handed Leila the meter and said, “You lead the measurements.”','Sam shared leadership by asking Leila to manage the measurements.']]
 ],
 'l2-es-food-project':[
  [['At closing time, Lina saw sealed sandwiches going into the market bin.','Lina saw safe packaged sandwiches being thrown away when the market closed.']],
  [['Across the street, the community refrigerator was already empty.','The public food refrigerator nearby had no food left.']],
  [['The students proposed collecting every leftover item that night.','The students first wanted to take all the extra food that night.']],
  [['The food-bank coordinator stopped them. “Safe food still needs safe handling.”','A food-bank worker explained that food must be transported safely.']],
  [['A public sign-up list would also reveal which families needed help.','Listing names in public would show which families needed support.']],
  [['Lina compared the market’s closing time with the refrigerator’s delivery hours.','Lina compared when the market closed with when volunteers delivered food.']],
  [['The surplus appeared after the last volunteer had gone home.','The extra food became available only after the volunteers had left.']],
  [['The group arranged an earlier collection with insulated boxes and no family names.','The group planned an earlier collection using boxes that kept food cold and did not record family names.']],
  [['On the first evening, a delivery van arrived late, and the yogurt became too warm.','A late vehicle made the yogurt too warm to use safely.']],
  [['They discarded it, recorded the loss, and changed the route.','They did not give out unsafe food; they recorded the problem and changed the route.']],
  [['The second collection included only sealed, labeled food kept at a safe temperature.','On the second collection, they took only sealed food with labels that stayed cold enough.']],
  [['Families chose items privately at the community center, without signing a public list.','Families selected food in private and did not put their names on a public list.']],
  [['The market began discounting extra food before closing, so less remained to collect.','The market reduced prices near closing, so less food was thrown away.']],
  [['A small board reported “Thirty-four meals saved”—and displayed no names.','A public board showed the total meals saved but protected every family’s privacy.']]
 ],
 'l2-es-river':[
  [['After a powerful storm, cups and plastic bags covered the local riverbank.','After a strong storm, cups and plastic bags covered the ground beside the river.']],
  [['Several residents blamed weekend visitors who had picnicked there.','Some local people blamed visitors who had eaten beside the river.']],
  [['Mira noticed that many cups carried the same blue market logo.','Mira saw that many cups had the same blue store sign on them.']],
  [['She photographed them and followed the muddy trail to a street drain upstream.','She took pictures and followed the muddy path to a street drain farther up the river.']],
  [['Behind the shopping center, one waste container had lost its lid.','One trash container behind the stores no longer had a lid.']],
  [['Wind had lifted the cups; rain had swept them into the street drain.','Wind moved the cups, and rain carried them into the drain.']],
  [['The drain had carried them into the stream, and the stream had fed the river.','The drain led to a small stream that carried the cups into the river.']],
  [['The manager looked at the open container. “One missing lid caused all this?”','The manager was surprised that one missing lid had caused so much pollution.']],
  [['The students showed the sequence instead of blaming one careless person.','The students explained each step and did not blame one person without evidence.']],
  [['A municipal crew used a temporary screen to catch waste and removed it safely.','City workers caught the trash with a temporary screen and removed it safely.']],
  [['The shopping center replaced the lid and moved the containers under a shelter.','The stores added a new lid and moved the trash containers under a roof.']],
  [['When a worker tested the new lid, it lifted without locking.','A worker discovered that the new lid could open because it did not lock.']],
  [['The team added metal latches and a storm inspection checklist.','They added metal locks and a list of checks to complete before storms.']],
  [['After the next heavy rain, Mira checked the river for blue cups.','Mira looked for cups with the blue store sign after the next strong rain.']],
  [['She found none, but recorded two different bags from another drain.','She found no blue cups, but saw two other bags from a different drain.']],
  [['The group marked the new source on its map and continued the investigation.','The students added the new source to their map and kept investigating.']]
 ],
 'l3-a1-final-place':[
  [['Only one place remained','נותר רק מקום אחד'],['on the school basketball team.','בנבחרת הכדורסל של בית הספר.']],
  [['Daniel was the best scorer,','דניאל היה הקלע הטוב ביותר,'],['but he often kept the ball','אבל לעיתים קרובות שמר את הכדור'],['too long.','זמן רב מדי.']],
  [['Oren scored less,','אורן קלע פחות,'],['yet he trained regularly','אך התאמן בקביעות'],['and passed to open players.','ומסר לשחקנים פנויים.']],
  [['The tournament was one week away,','הטורניר עמד להתחיל בעוד שבוע,'],['and the team badly needed points.','והנבחרת הייתה זקוקה מאוד לנקודות.']],
  [['In the final practice game,','במשחק האימון האחרון,'],['Daniel scored twice','דניאל קלע פעמיים'],['in one minute.','בדקה אחת.']],
  [['Then he ignored','אחר כך הוא התעלם'],['an open teammate','מחבר לקבוצה שהיה פנוי'],['and lost the ball.','ואיבד את הכדור.']],
  [['Oren missed his next shot,','אורן החטיא את הזריקה הבאה שלו,'],['but ran back','אבל רץ לאחור'],['and stopped an easy basket.','ומנע סל קל.']],
  [['Coach Amir read','המאמן אמיר קרא'],['the three standards','את שלושת המדדים'],['from the selection sheet:','מדף הבחירה:'],['skill, effort and teamwork.','יכולת, מאמץ ועבודת צוות.']],
  [['He chose Oren','הוא בחר באורן'],['and told Daniel,','ואמר לדניאל:'],['“I am choosing the player','״אני בוחר בשחקן'],['who shows all three.”','שמראה את שלושתם.״']],
  [['At the tournament,','בטורניר,'],['the team struggled to score','הנבחרת התקשתה לקלוע'],['and lost by two points.','והפסידה בשתי נקודות.']],
  [['Even so,','למרות זאת,'],['Oren made two assists','אורן מסר שתי מסירות לסל'],['and helped the players','ועזר לשחקנים'],['work together.','לעבוד יחד.']],
  [['On Monday,','ביום שני,'],['Daniel returned for practice','דניאל חזר לאימון'],['with the coach’s teamwork plan','עם תכנית עבודת הצוות של המאמן'],['folded in his bag.','מקופלת בתיקו.']]
 ],
 'l3-a1-park':[
  [['A city notice','הודעת עירייה'],['on the park fence','על גדר הפארק'],['showed thirty new parking spaces.','הציגה שלושים מקומות חניה חדשים.']],
  [['The plan would remove','לפי התכנית יוסרו'],['half the grass','מחצית מהדשא'],['and six old trees.','ושישה עצים ישנים.']],
  [['The students began a petition','התלמידים פתחו עצומה'],['to save every part','כדי להציל כל חלק'],['of the park.','בפארק.']],
  [['Mrs. Levi, a shop owner,','גברת לוי, בעלת חנות,'],['showed them delivery trucks','הראתה להם משאיות משלוחים'],['blocking the road.','שחסמו את הכביש.']],
  [['“We need the park,” she said,','״אנחנו צריכים את הפארק,״ אמרה,'],['“but we also need safe parking.”','״אבל אנחנו צריכים גם חניה בטוחה.״']],
  [['The students counted park users,','התלמידים ספרו משתמשים בפארק,'],['empty parking spaces','מקומות חניה פנויים'],['and delivery delays','ועיכובים במשלוחים'],['for one week.','במשך שבוע אחד.']],
  [['Rami noticed','רמי הבחין'],['an unused paved lot','במגרש מרוצף שאינו בשימוש'],['behind the community center.','מאחורי המרכז הקהילתי.']],
  [['Its broken gate','השער השבור שלו'],['and dark path explained','והשביל החשוך הסבירו'],['why drivers avoided it.','מדוע נהגים נמנעו ממנו.']],
  [['The students walked the route','התלמידים הלכו במסלול'],['with an older resident','עם תושב מבוגר'],['and found a high curb.','וגילו שפת מדרכה גבוהה.']],
  [['Their new plan kept the park','התכנית החדשה שמרה על הפארק'],['and used the budget','והשתמשה בתקציב'],['to repair the lot,','כדי לתקן את המגרש,'],['add lights','להוסיף תאורה'],['and build a ramp.','ולבנות כבש.']],
  [['The budget could not include','התקציב לא היה יכול לכלול'],['the new playground equipment','את מתקני המשחק החדשים'],['they had wanted.','שהם רצו.']],
  [['At the public meeting,','במפגש הציבורי,'],['the students presented','התלמידים הציגו'],['both the solution and its cost.','גם את הפתרון וגם את מחירו.']],
  [['Months later,','כעבור חודשים,'],['Mrs. Levi parked','גברת לוי חנתה'],['in the repaired lot','במגרש המתוקן'],['while children played','בזמן שילדים שיחקו'],['under the same trees.','מתחת לאותם עצים.']]
 ],
 'l3-a1-empty-seat':[
  [['After David’s accident,','לאחר התאונה של דוד,'],['he stayed in hospital','הוא נשאר בבית החולים'],['for several weeks.','במשך כמה שבועות.']],
  [['His empty seat','המקום הריק שלו'],['remained beside the classroom window.','נשאר ליד חלון הכיתה.']],
  [['The class sent homework photos','הכיתה שלחה תמונות של שיעורי הבית'],['and many long messages.','והודעות ארוכות רבות.']],
  [['David tried to answer everything,','דוד ניסה לענות על הכול,'],['but soon closed his eyes.','אך עד מהרה עצם את עיניו.']],
  [['Noa noticed his short replies.','נועה הבחינה בתשובות הקצרות שלו.']],
  [['She called and asked,','היא התקשרה ושאלה:'],['“What would help today?”','״מה יעזור לך היום?״']],
  [['“One clear page,” David said,','״דף ברור אחד,״ אמר דוד,'],['“and one short call.”','״ושיחה קצרה אחת.״']],
  [['The class changed its plan.','הכיתה שינתה את התכנית שלה.']],
  [['Eli sent neat notes,','אלי שלח סיכומים מסודרים,'],['and Noa explained one exercise.','ונועה הסבירה תרגיל אחד.']],
  [['The others sent one greeting,','האחרים שלחו ברכה אחת,'],['not ten questions.','ולא עשר שאלות.']],
  [['During the video call,','במהלך שיחת הווידאו,'],['David solved the last step himself.','דוד פתר בעצמו את השלב האחרון.']],
  [['He smiled and held up','הוא חייך והרים'],['the finished page.','את הדף שהשלים.']],
  [['Students divided notes and visits','התלמידים חילקו ביניהם סיכומים וביקורים'],['without tiring him.','בלי לעייף אותו.']],
  [['When David returned,','כאשר דוד חזר,'],['he walked slowly to his seat.','הוא הלך לאט אל מקומו.']],
  [['A classmate missed the instructions.','חבר לכיתה החמיץ את ההוראות.'],['David shared his notes and said,','דוד שיתף את הסיכומים שלו ואמר:'],['“One clear page at a time.”','״דף ברור אחד בכל פעם.״']]
 ],
 'l3-a2-anonymous-account':[
  [['Four friends created an anonymous account','ארבעה חברים יצרו חשבון אנונימי'],['for jokes about school life.','לבדיחות על חיי בית הספר.']],
  [['At first, the jokes stayed general,','בתחילה הבדיחות נשארו כלליות,'],['and the account gained followers.','והחשבון צבר עוקבים.']],
  [['Then Lior uploaded a video','אחר כך ליאור העלה סרטון'],['of Amir falling during basketball practice.','שבו אמיר נופל באימון כדורסל.']],
  [['The comments became cruel,','התגובות נעשו אכזריות,'],['and Amir stopped coming to school.','ואמיר הפסיק להגיע לבית הספר.']],
  [['Dana knew the password,','דנה ידעה את הסיסמה,'],['but deleted only the worst comment.','אך מחקה רק את התגובה הגרועה ביותר.']],
  [['The next day, the teacher said','למחרת המורה אמרה'],['Amir had asked to study from home.','שאמיר ביקש ללמוד מן הבית.']],
  [['Dana turned her phone face down','דנה הפכה את הטלפון על פניו'],['when the others prepared another post.','כאשר האחרים הכינו פרסום נוסף.']],
  [['“I helped create this account,”','״עזרתי ליצור את החשבון הזה,״'],['she said. “We have to stop.”','אמרה. ״אנחנו חייבים לעצור.״']],
  [['“Nobody knows it is us,”','״איש אינו יודע שאלה אנחנו,״'],['one friend replied.','השיב אחד החברים.']],
  [['Dana and two creators','דנה ושניים מיוצרי החשבון'],['showed the full account','הראו את החשבון המלא'],['to the counselor','ליועצת'],['and admitted their own roles.','והודו בחלקם.']],
  [['With the counselor, they posted a clear correction,','יחד עם היועצת הם פרסמו תיקון ברור,'],['removed the video and closed the account.','הסירו את הסרטון וסגרו את החשבון.']],
  [['Amir accepted a written apology,','אמיר קיבל התנצלות כתובה,'],['but did not agree to meet them.','אך לא הסכים לפגוש אותם.']],
  [['Weeks later, Dana waited for permission','כעבור שבועות דנה חיכתה לקבל רשות'],['before sharing a team photo.','לפני ששיתפה תמונת נבחרת.'],['The photo stayed in her draft','התמונה נשארה בטיוטה שלה'],['until everyone answered.','עד שכולם ענו.']]
 ],
 'l3-a2-volunteer-truth':[
  [['A school group entered a competition','קבוצת בית ספר השתתפה בתחרות'],['for community service projects.','של מיזמי התנדבות קהילתית.']],
  [['Their grocery visits had helped','ביקורי חלוקת המזון שלהם עזרו'],['twelve older residents.','לשנים־עשר תושבים מבוגרים.']],
  [['Roni opened the final report','רוני פתח את הדו״ח הסופי'],['and saw twenty visits','וראה עשרים ביקורים'],['and sixty volunteer hours.','ושישים שעות התנדבות.']],
  [['The spreadsheet counted travel twice','הגיליון ספר את זמן הנסיעה פעמיים'],['and included canceled visits.','וכלל ביקורים שבוטלו.']],
  [['“Every group presents its strongest numbers,”','״כל קבוצה מציגה את המספרים החזקים ביותר שלה,״'],['the team leader said.','אמר ראש הקבוצה.']],
  [['When the judges named them finalists,','כאשר השופטים הכריזו שהם בגמר,'],['Roni tightened his grip','רוני הידק את אחיזתו'],['on the folder.','בתיקייה.']],
  [['The coordinator’s signed log','היומן החתום של הרכזת'],['listed only twelve visits.','ציין רק שנים־עשר ביקורים.']],
  [['“If we correct this now,','״אם נתקן זאת עכשיו,'],['we may lose,” a teammate warned.','אנחנו עלולים להפסיד,״ הזהיר חבר לקבוצה.']],
  [['During the presentation, a judge asked,','במהלך ההצגה שאל שופט:'],['“Did you complete all twenty visits?”','״האם השלמתם את כל עשרים הביקורים?״']],
  [['Roni closed the slides.','רוני סגר את המצגת.'],['“No. Our report is wrong.”','״לא. הדו״ח שלנו שגוי.״']],
  [['The group explained the double count','הקבוצה הסבירה את הספירה הכפולה'],['and submitted the correct record.','והגישה את הרישום הנכון.']],
  [['They lost the prize,','הם הפסידו את הפרס,'],['and one teammate left angrily.','וחבר אחד עזב בכעס.']],
  [['On Sunday, Roni and that teammate','ביום ראשון רוני ואותו חבר'],['delivered groceries without cameras','חילקו מזון בלי מצלמות'],['or competition badges.','או תגי תחרות.']],
  [['Their next project','המיזם הבא שלהם'],['used a daily log','השתמש ביומן יומי'],['checked by two students.','שנבדק בידי שני תלמידים.']]
 ],
 'l3-a2-repair-cafe':[
  [['Teenagers and older volunteers opened','בני נוער ומתנדבים מבוגרים פתחו'],['a monthly repair café.','סדנת תיקונים חודשית.']],
  [['The first table filled with lamps,','השולחן הראשון התמלא במנורות,'],['torn bags and a wooden chair.','תיקים קרועים וכיסא עץ.']],
  [['Mrs. Ben-David touched a carved star','גברת בן־דוד נגעה בכוכב מגולף'],['on the chair her husband had built.','שעל הכיסא שבנה בעלה.']],
  [['Yonatan picked up a drill.','יונתן הרים מקדחה.'],['“It only needs a screw.”','״הוא צריך רק בורג.״']],
  [['Mr. Barak turned the chair over','מר ברק הפך את הכיסא'],['and showed him a split joint.','והראה לו חיבור סדוק.']],
  [['Yonatan looked away.','יונתן הסיט את מבטו.'],['The older method seemed too slow.','השיטה הישנה נראתה לו אטית מדי.']],
  [['Their first clamp slipped,','המהדק הראשון שלהם החליק,'],['and the chair leaned farther.','והכיסא נטה עוד יותר.']],
  [['Mrs. Ben-David touched the star again','גברת בן־דוד נגעה שוב בכוכב'],['as closing time approached.','כאשר שעת הסגירה התקרבה.']],
  [['Other volunteers began packing their tools.','מתנדבים אחרים החלו לארוז את כליהם.']],
  [['“I know this joint,” Mr. Barak said,','״אני מכיר את החיבור הזה,״ אמר מר ברק,'],['“but my hands are unsteady today.”','״אבל הידיים שלי אינן יציבות היום.״']],
  [['“Show me where to hold it,”','״תראה לי היכן להחזיק אותו,״'],['Yonatan replied.','השיב יונתן.']],
  [['They cut a support','הם חתכו תמיכה'],['from scrap wood','משארית עץ'],['and fitted it into the joint.','והתאימו אותה לחיבור.']],
  [['Yonatan used the drill','יונתן השתמש במקדחה'],['after Mr. Barak checked the angle.','לאחר שמר ברק בדק את הזווית.']],
  [['Mrs. Ben-David sat down carefully.','גברת בן־דוד התיישבה בזהירות.'],['The chair stayed steady,','הכיסא נשאר יציב,'],['and the carved star remained untouched.','והכוכב המגולף נשאר ללא פגע.']],
  [['Yonatan added their repair steps','יונתן הוסיף את שלבי התיקון שלהם'],['to the workshop folder.','לתיקיית הסדנה.']],
  [['The next month,','בחודש הבא,'],['Mr. Barak handed him','מר ברק הושיט לו'],['a broken shelf.','מדף שבור.'],['Yonatan asked, “What do you see?”','יונתן שאל: ״מה אתה רואה?״']]
 ],
 'l3-es-promise':[
  [['Tom asked Aaron to keep a secret before showing him the school bicycle.','Tom asked Aaron not to tell anyone before he showed him a bicycle that belonged to the school.']],
  [['Aaron agreed, expecting a personal problem that belonged only to his friend.','Aaron thought the secret would be private information about Tom.']],
  [['Behind the workshop, Tom revealed a brake cable he had snapped while attempting a repair.','Tom showed Aaron that he had broken the cable that made the bicycle brakes work.']],
  [['A younger class','Younger students'],['was scheduled to use','were going to use'],['that bicycle','that bicycle'],['in a safety lesson','during a safety lesson'],['the next morning.','the next day.']],
  [['“Another mistake will remove me from the repair club,” Tom whispered.','Tom feared that he would lose his place in the club if he admitted another mistake.']],
  [['Aaron offered to report the damage with him, but Tom refused.','Aaron said they could tell the teacher together, but Tom said no.']],
  [['The promise now protected Tom while the silence endangered somebody else.','Keeping the secret could help Tom but could put another student in danger.']],
  [['“Tell the teacher before school starts,” Aaron said. “I will wait until then.”','Aaron gave Tom time to admit the damage before the lesson.']],
  [['The next morning, the bicycle had already been moved beside the gym door.','Aaron saw that the unsafe bicycle was ready for the younger class.']],
  [['Aaron gripped the cold handlebar, then called the workshop teacher.','Aaron felt afraid but contacted the teacher.']],
  [['He described the danger privately and shared no unnecessary details.','Aaron told only the responsible adult and did not spread the secret.']],
  [['The teacher removed the bicycle, replaced the cable and used another one for the lesson.','The dangerous bicycle was repaired, and the lesson continued safely with a different bicycle.']],
  [['Tom admitted the damage and lost his tool privileges for two weeks.','Tom told the truth and could not use the workshop tools for two weeks.']],
  [['He did not speak to Aaron for several days.','Tom remained angry, so the friendship did not improve immediately.']],
  [['When Tom returned, he asked Aaron to test the brakes; both boys nodded when the lever held.','Later Tom asked Aaron to check the repaired brakes, and trust began to return.']]
 ],
 'l3-es-winning':[
  [['The school relay team crossed the championship finish line first by less than a second.','The school team won the final running race by a very small amount.']],
  [['During the last handoff, Liam had seen Ravi receive the baton beyond the marked exchange zone.','Liam saw that Ravi took the baton outside the area allowed by the rules.']],
  [['The official missed the violation, and the scoreboard displayed first place.','The judge did not see the broken rule, so the team was shown as the winner.']],
  [['“It did not change the race,” Ravi whispered.','Ravi claimed that the mistake had not affected the result.']],
  [['The medal ceremony was only five minutes away.','The team had very little time before receiving the medals.']],
  [['White chalk from the boundary line still marked Ravi’s shoe.','A white mark on Ravi’s shoe reminded Liam where the handoff had happened.']],
  [['The captain warned that a report could disqualify all four runners.','The team leader explained that every runner could lose the result.']],
  [['Liam watched the second-place team fold its flag in silence.','Liam saw the other team quietly accept that it had lost.']],
  [['“The exchange was outside the zone, wasn’t it?” Liam asked.','Liam asked Ravi to confirm what had happened.']],
  [['Ravi nodded. “Please let it go.”','Ravi admitted the violation but asked Liam to hide it.']],
  [['“If the line matters when we lose, it matters now,” Liam told the captain.','Liam said that the rule must matter both in defeat and in victory.']],
  [['The team approached the referee before the medals were presented.','The runners reported the violation before receiving their awards.']],
  [['Video confirmed the illegal exchange, and the team was disqualified.','A recording proved the rule had been broken, so the team lost first place.']],
  [['Two teammates walked away without speaking to Liam.','Some teammates were angry with Liam after the decision.']],
  [['Ravi later apologized','Ravi admitted'],['for asking Liam','that asking Liam'],['to carry the secret.','to hide the truth had been unfair.']],
  [['At the next practice, bright tape marked the exchange zone, and every handoff was repeated.','The team practiced the difficult part carefully with a clear boundary.']],
  [['At their next meet, they finished second; Liam checked the clean exchange before cheering.','Later the team did not win, but Liam celebrated only after seeing that every handoff was legal.']]
 ],
 'l3-es-neighborhood-plan':[
  [['The city council asked students to review a plan for sixty apartments and a new bus route.','The local government invited students to examine a plan for new homes and public transportation.']],
  [['The first proposal removed fourteen mature trees to reduce construction costs.','The original plan cut down fourteen old trees so building would cost less.']],
  [['Maya argued that the trees protected the street from summer heat.','Maya explained that the trees gave important shade during hot weather.']],
  [['Natan replied','Natan said'],['that his family had waited','that his family urgently needed'],['three years','one of'],['for an affordable home.','the planned homes.']],
  [['Their argument stopped the planning session until the teacher asked them to map actual needs.','The students could not continue until they agreed to collect evidence.']],
  [['At 7:30 one morning, forty-three people waited beside the narrow bus stop.','The students counted many people waiting for the bus early in the morning.']],
  [['After school, they found a parking area behind the shops that was half empty.','They discovered that part of a nearby parking lot was not being used.']],
  [['A shop owner showed them why delivery trucks still needed two lanes at noon.','A local business owner explained that deliveries required part of the parking area.']],
  [['A resident','A resident showed'],['who used a wheelchair','that the route'],['pointed to the high curb','from the parking lot'],['between the lot and the street.','was not accessible.']],
  [['The students moved one apartment block','They changed the plan'],['onto the empty section','so one building used'],['of the parking lot.','the empty section.']],
  [['They kept the delivery lanes and added an accessible bus stop.','The revised plan protected deliveries and made the bus stop easier to use.']],
  [['An architect rejected underground parking because it would exceed the housing budget.','Building parking below the ground would make the homes too expensive.']],
  [['The revised design kept all fourteen trees and included fifty-four homes.','The new plan protected every old tree but provided six fewer homes.']],
  [['It also removed twenty parking spaces and postponed the proposed sports court.','The plan required fewer parking spaces and delayed another community project.']],
  [['At the public meeting, Maya presented the benefits, and Natan stated every remaining cost.','The two students honestly explained both the advantages and the disadvantages.']],
  [['The council approved a detailed study rather than immediate construction.','The local government agreed to investigate the revised plan before building.']],
  [['Residents requested a transport trial and a delivery review before the final vote.','Local people asked for tests to see whether the changes would work.']],
  [['Months later,','Later the students'],['Maya and Natan counted riders','continued collecting evidence together'],['beneath the same trees','while the old trees'],['at the trial accessible bus stop.','still stood.']]
 ],
 'l1-a1-broken-pencil':[
  [['Nadav’s pencil broke just before the lesson began.','העיפרון של נדב נשבר ממש לפני תחילת השיעור.']],
  [['He searched his bag,','הוא חיפש בתיק שלו,'],['but found an empty pencil case.','אבל מצא קלמר ריק.']],
  [['Sara noticed','שרה הבחינה'],['the half-finished answer','בתשובה שלא הושלמה'],['on his page.','בדף שלו.']],
  [['“Do you need a pencil?”','״אתה צריך עיפרון?״'],['she asked quietly.','היא שאלה בשקט.']],
  [['Nadav nodded,','נדב הנהן,'],['but looked down because he felt embarrassed.','אבל השפיל מבט כי הרגיש נבוך.']],
  [['Sara placed a sharp pencil beside his notebook.','שרה הניחה עיפרון מחודד ליד המחברת שלו.']],
  [['“What will you use?” Nadav asked.','״במה את תשתמשי?״ שאל נדב.']],
  [['She showed him','היא הראתה לו'],['a second, shorter pencil.','עיפרון שני וקצר יותר.']],
  [['Nadav finished the page before the bell.','נדב סיים את הדף לפני הצלצול.']],
  [['At break,','בהפסקה,'],['he sharpened his broken pencil','הוא חידד את העיפרון השבור שלו'],['and returned Sara’s pencil.','והחזיר לשרה את העיפרון שלה.']],
  [['The next day,','למחרת,'],['he added a spare pencil','הוא הוסיף עיפרון נוסף'],['to the class supply box.','לקופסת הציוד הכיתתית.']]
 ],
 'l1-a1-rainy-walk':[
  [['Heavy rain began after school,','גשם כבד החל לאחר הלימודים,'],['and water covered the usual path.','ומים כיסו את הדרך הרגילה.']],
  [['Ben wanted to reach home','בן רצה להגיע הביתה'],['before his brother blew out','לפני שאחיו יכבה'],['the birthday candles.','את נרות יום ההולדת.']],
  [['Brown water covered the curb','מים חומים כיסו את שפת המדרכה'],['on the short street.','ברחוב הקצר.']],
  [['“It is only one block,”','״זה רק רחוב אחד,״'],['Ben said.','אמר בן.']],
  [['Aya watched a leaf spin','איה ראתה עלה מסתובב'],['toward the storm drain.','לעבר פתח הניקוז.']],
  [['“We cannot see the curb,” she said.','״אנחנו לא יכולים לראות את שפת המדרכה,״ אמרה.'],['Ben gripped his backpack strap','בן אחז ברצועת התיק שלו'],['and stepped back.','וצעד לאחור.']],
  [['They tried the footbridge,','הם ניסו את הגשר להולכי רגל,'],['but a closed gate blocked it.','אך שער סגור חסם אותו.']],
  [['The phone showed ten minutes','הטלפון הראה שנותרו עשר דקות'],['until the birthday began.','עד תחילת יום ההולדת.']],
  [['Ben looked at the flooded street,','בן הביט ברחוב המוצף,'],['then called his mother.','ואז התקשר לאמו.']],
  [['They waited together','הם המתינו יחד'],['under the library awning.','מתחת לסככת הספרייה.']],
  [['Ben reached home','בן הגיע הביתה'],['after the candles were out,','לאחר שכובו הנרות,'],['but his brother had saved','אך אחיו שמר'],['the first slice of cake.','את פרוסת העוגה הראשונה.']],
  [['On the next rainy day,','ביום הגשום הבא,'],['Ben checked the safe route first.','בן בדק תחילה את הדרך הבטוחה.'],['“The long way is fine,”','״הדרך הארוכה בסדר,״'],['he told his friends.','אמר לחבריו.']]
 ],
 'l1-a1-class-plant':[
  [['The class bean plant bent low','צמח השעועית הכיתתי התכופף'],['during a hot week.','במהלך שבוע חם.']],
  [['The water chart had been empty','טבלת ההשקיה נשארה ריקה'],['since Thursday.','מאז יום חמישי.']],
  [['Everyone thought someone else','כולם חשבו שמישהו אחר'],['would remember the plant.','יזכור את הצמח.']],
  [['Sami poured a full bottle,','סמי שפך בקבוק מלא,'],['and water ran under the pot.','ומים זרמו מתחת לעציץ.']],
  [['Leah moved the books away.','לאה הרחיקה את הספרים.'],['“More water is not always better.”','״יותר מים אינם תמיד טובים יותר.״']],
  [['The teacher emptied the tray','המורה רוקנה את המגש'],['and brought a small measuring cup.','והביאה כוס מדידה קטנה.']],
  [['The class checked the soil','הכיתה בדקה את האדמה'],['each morning','בכל בוקר'],['and watered the plant','והשקתה את הצמח'],['only when the soil was dry.','רק כאשר האדמה הייתה יבשה.']],
  [['They chose two plant carers','הם בחרו שני מטפלים בצמח'],['and one backup for each day.','ומחליף אחד לכל יום.']],
  [['On Monday, the leaves still hung low.','ביום שני העלים עדיין היו שמוטים.'],['Sami reached for the full bottle.','סמי הושיט יד לבקבוק המלא.']],
  [['Leah touched the damp soil,','לאה נגעה באדמה הלחה,'],['and they waited.','והם המתינו.']],
  [['On Tuesday, one leaf lifted.','ביום שלישי עלה אחד התרומם.'],['They measured half a cup.','הם מדדו חצי כוס.']],
  [['By Friday, a new green leaf','עד יום שישי עלה ירוק חדש'],['had appeared.','הופיע.']],
  [['When Leah was absent,','כאשר לאה נעדרה,'],['the backup checked the soil','המחליף בדק את האדמה'],['and recorded the amount.','ורשם את הכמות.']]
 ],
 'l1-a2-spare-seat':[
  [['The bus was crowded','האוטובוס היה צפוף'],['after soccer practice.','אחרי אימון הכדורגל.']],
  [['Amir found the last empty seat','אמיר מצא את המושב הפנוי האחרון'],['and rested his tired legs.','והניח לרגליו העייפות לנוח.']],
  [['At the next stop,','בתחנה הבאה,'],['an older woman boarded','עלתה אישה מבוגרת'],['with a heavy shopping bag.','עם שקית קניות כבדה.']],
  [['The bus moved suddenly,','האוטובוס נע לפתע,'],['and the bag struck the floor.','והשקית פגעה ברצפה.']],
  [['Amir looked at his aching legs,','אמיר הביט ברגליו הכואבות,'],['then at the woman.','ואז באישה.']],
  [['He stood','הוא קם'],['and held the rail.','ואחז במעקה.']],
  [['“Please take this seat,”','״בבקשה שבי כאן,״'],['he said.','אמר.']],
  [['She sat down,','היא התיישבה,'],['and Amir lifted her bag.','ואמיר הרים את השקית שלה.']],
  [['At the next turn,','בסיבוב הבא,'],['the bag slipped again,','השקית החליקה שוב,'],['but Amir steadied it.','אך אמיר ייצב אותה.']],
  [['When the bus reached Amir’s stop,','כאשר האוטובוס הגיע לתחנה של אמיר,'],['the woman stood too.','גם האישה קמה.']],
  [['“I can carry it now,” she said,','״עכשיו אני יכולה לשאת אותה,״ אמרה,'],['“but thank you for noticing.”','״אבל תודה ששמת לב.״']],
  [['On the next crowded ride,','בנסיעה הצפופה הבאה,'],['Amir looked up at every stop','אמיר הרים את מבטו בכל תחנה'],['before opening his phone.','לפני שפתח את הטלפון.']]
 ],
 'l1-a2-missed-practice':[
  [['Lior missed the final practice','ליאור החמיץ את האימון האחרון'],['before the school basketball match.','לפני משחק הכדורסל של בית הספר.']],
  [['His younger brother became ill,','אחיו הצעיר חלה,'],['and Lior stayed at the clinic.','וליאור נשאר איתו במרפאה.']],
  [['His phone battery died','הסוללה בטלפון שלו התרוקנה'],['before he could message the team.','לפני שהספיק לשלוח הודעה לנבחרת.']],
  [['The next day,','למחרת,'],['Yarden asked,','ירדן שאל:'],['“Did the team stop mattering?”','״הנבחרת כבר לא חשובה לך?״']],
  [['Lior gripped','ליאור אחז בחוזקה'],['his practice shirt.','בחולצת האימון שלו.']],
  [['“My family needed me,” he said,','״המשפחה שלי הייתה זקוקה לי,״ אמר,'],['“but I should have warned you.”','״אבל הייתי צריך להודיע לכם.״']],
  [['Yarden lowered his voice.','ירדן הנמיך את קולו.'],['“We thought you had quit.”','״חשבנו שפרשת.״']],
  [['The captain listened','הקפטן הקשיב'],['to both of them','לשניהם'],['before anyone answered again.','לפני שמישהו ענה שוב.']],
  [['Missing practice still had a cost:','להחמצת האימון עדיין היה מחיר:'],['Lior began the match','ליאור התחיל את המשחק'],['on the bench.','על הספסל.']],
  [['He arrived early','הוא הגיע מוקדם'],['for extra practice','לאימון נוסף'],['and learned the new play.','ולמד את המהלך החדש.']],
  [['During the match,','במהלך המשחק,'],['Yarden called for Lior','ירדן קרא לליאור'],['when the new play began.','כאשר המהלך החדש התחיל.']],
  [['Their pass created an open shot,','המסירה שלהם יצרה זריקה פנויה,'],['but the team lost by one point.','אך הנבחרת הפסידה בנקודה אחת.']],
  [['The next time family plans changed,','בפעם הבאה שהתכניות המשפחתיות השתנו,'],['Lior sent one clear message,','ליאור שלח הודעה ברורה אחת,'],['and Yarden asked before guessing.','וירדן שאל לפני שהניח הנחות.']]
 ],
 'l1-a2-reusable-bottle':[
  [['After Monday’s sports lesson,','אחרי שיעור הספורט ביום שני,'],['the classroom bin overflowed','פח הכיתה עלה על גדותיו'],['with plastic water bottles.','מבקבוקי מים מפלסטיק.']],
  [['Miri counted eighty-seven bottles','מירי ספרה שמונים ושבעה בקבוקים'],['before the cleaner emptied it.','לפני שעובד הניקיון רוקן את הפח.']],
  [['“We use more than we think,”','״אנחנו משתמשים ביותר ממה שנדמה לנו,״'],['she told the class.','אמרה לכיתה.']],
  [['Everyone promised to bring','כולם הבטיחו להביא'],['a reusable bottle on Tuesday.','בקבוק לשימוש חוזר ביום שלישי.']],
  [['By first break,','עד ההפסקה הראשונה,'],['nine students had forgotten theirs.','תשעה תלמידים שכחו את הבקבוקים שלהם.']],
  [['The refill tap also ran slowly,','גם ברז המילוי זרם לאט,'],['so the line reached the stairs.','ולכן התור הגיע עד המדרגות.']],
  [['Several students bought','כמה תלמידים קנו'],['plastic bottles again.','שוב בקבוקי פלסטיק.']],
  [['Miri’s first plan had failed.','התכנית הראשונה של מירי נכשלה.'],['She crossed out the word “reminder.”','היא מחקה את המילה ״תזכורת״.']],
  [['She asked the office','היא ביקשה מן ההנהלה'],['for a one-week refill trial','ניסיון של שבוע עם תחנת מילוי'],['near the sports hall.','ליד אולם הספורט.']],
  [['Students placed their bottles','התלמידים הניחו את הבקבוקים שלהם'],['beside their schoolbags each evening.','ליד תיקי בית הספר בכל ערב.']],
  [['They also reported the slow tap,','הם גם דיווחו על הברז האטי,'],['and it was repaired.','והוא תוקן.']],
  [['One week later,','שבוע לאחר מכן,'],['Miri counted twenty-one plastic bottles.','מירי ספרה עשרים ואחד בקבוקי פלסטיק.']],
  [['The number was lower,','המספר היה נמוך יותר,'],['but visitors still needed','אך מבקרים עדיין נזקקו'],['an easy refill point.','לנקודת מילוי נוחה.']],
  [['The school kept the refill station;','בית הספר השאיר את תחנת המילוי;'],['that evening, Miri set her bottle','באותו ערב מירי הניחה את הבקבוק שלה'],['beside her schoolbag.','ליד תיק בית הספר.']]
 ],
 'l1-es-new-glasses':[
  [['Ethan paused outside the classroom and cleaned his new glasses for the third time.','Ethan waited outside and cleaned the glasses again because he was nervous.']],
  [['Through the lenses, every word on the distant board looked sharply defined.','The new glasses made the writing on the far board clear.']],
  [['Before the bell, Lev glanced at the thick blue frames and made a joke.','Lev looked at the blue glasses and joked about them.']],
  [['A few students laughed, and Ethan felt a quick reply forming.','Some students laughed, and Ethan wanted to answer angrily.']],
  [['He folded the cleaning cloth into a tiny square before answering.','Ethan paused and folded the cloth while he controlled his response.']],
  [['“I need them to see,” he said. “They are not a costume.”','Ethan said that the glasses helped him see and were not a toy.']],
  [['Maya asked about yesterday’s game, giving Ethan a way to move on.','Maya changed the subject so Ethan could continue his day.']],
  [['At lunch, Lev reached toward the frames and asked to try them.','Later Lev tried to touch the glasses and asked to wear them.']],
  [['Ethan stepped back. “No. You can ask without touching.”','Ethan moved away and set a clear physical boundary.']],
  [['The science teacher later asked whether Ethan wanted her to address the class.','The teacher privately asked if Ethan wanted her to speak to everyone.']],
  [['“No announcement,” he said. “I just want a normal day.”','Ethan did not want public attention; he wanted ordinary treatment.']],
  [['After school, Lev apologized without explaining away the joke.','Lev gave a direct apology and did not make excuses.']],
  [['Ethan did not say it was fine; he asked Lev not to repeat it.','Ethan accepted the apology without pretending that the joke had been harmless.']],
  [['The next morning, the blue frames still drew a few glances.','Some people still looked at the glasses the next day.']],
  [['Ethan entered without hiding them and read the first line on the board with ease.','Ethan wore the glasses openly and used them comfortably.']]
 ],
 'l1-es-school-map':[
  [['Three new students arrived late to science because the school map ended at the main stairs.','The map did not show the full route, so three new students were late.']],
  [['The design club assumed that brighter colors would solve the problem.','The club believed stronger colors would make the map clear.']],
  [['Their first prototype used red, green, and blue routes.','The first test map separated routes only by color.']],
  [['Omar stared at it and asked, “Which line is green?”','Omar could not tell which route was shown in green.']],
  [['Only then did the group learn that color alone excluded some readers.','The group learned that some people cannot use color as the only guide.']],
  [['A newcomer named Sofia also pointed to symbols she could not understand.','Sofia showed that several map signs were unclear to new students.']],
  [['Instead of defending the map, the club invited both students to test it.','The club listened and asked Omar and Sofia to help.']],
  [['They added shapes, room numbers, high-contrast arrows, and short bilingual labels.','The new map used several clear ways to show each route.']],
  [['The second test began at the front entrance during a busy break.','They tested the new map while the school halls were crowded.']],
  [['Sofia followed the triangle route until a locked door blocked it.','Sofia used one route, but a locked door stopped her.']],
  [['The map had ignored the accessible lift on the other side of the building.','The map had left out the route that avoided the stairs.']],
  [['The caretaker opened the route and explained when that door remained locked.','The caretaker showed when the door could and could not be used.']],
  [['Omar replaced the color-only lines with patterns that also worked in gray.','Omar added patterns so the routes remained different without color.']],
  [['Sofia reached the science room before the bell, but circled one confusing turn.','Sofia arrived on time and marked one part that still needed work.']],
  [['The club corrected that turn instead of calling the map finished.','The designers improved the map again instead of claiming it was perfect.']],
  [['A week later, Sofia welcomed another newcomer by handing over the map she had helped redesign.','Later Sofia used the improved map to help another new student.']]
 ],
 'l1-es-bird-nest':[
  [['A small bird built a nest on the ledge beside the classroom window.','A bird made a nest on the narrow shelf outside the window.']],
  [['Students pressed close to the glass, and several phones appeared.','The students crowded near the window and began taking pictures.']],
  [['The bird flew to a nearby tree but did not return while the crowd remained.','The bird stayed away because too many people were close to the nest.']],
  [['Ella suggested moving the nest to a quieter branch.','Ella wanted to move the nest somewhere calmer.']],
  [['The teacher stopped her and called a local wildlife volunteer before anyone touched it.','The teacher made sure nobody touched the nest and asked an expert for advice.']],
  [['The volunteer explained that distance, silence, and an unopened window were the safest help.','The expert said that the bird needed quiet space and no human contact.']],
  [['The class partly closed the blind and created two observation points farther back.','The students watched from two places away from the window.']],
  [['For three mornings, the parent bird returned with grass and food.','The adult bird returned when the class followed the quiet plan.']],
  [['On Thursday, a substitute cleaner rolled a bucket toward the window.','A different cleaner approached the window with cleaning equipment.']],
  [['The agreed cleaning schedule had not reached him.','Nobody had told the substitute about the nest plan.']],
  [['Ella noticed the open latch just before the cleaner raised the window.','Ella saw the danger before the cleaner opened the window.']],
  [['She asked him to wait and showed the agreed cleaning plan.','Ella politely stopped him and explained what the class had arranged.']],
  [['The teacher moved the cleaning to another window, and the nest stayed untouched.','They cleaned somewhere else and left the nest alone.']],
  [['A storm that afternoon shook the ledge, yet the nest remained secure.','Strong weather moved the ledge, but the nest stayed safe.']],
  [['The students watched from their marked places instead of rushing forward.','The class followed its plan even when the storm caused worry.']],
  [['Weeks later, the young birds left the nest one at a time.','The baby birds eventually became ready to fly away.']],
  [['After the ledge was empty, the class cleaned it and kept the quiet-viewing rule for future nests.','The students cleaned only after the birds left and remembered the safe rule.']]
 ],
 'l2-a1-library-book':[
  [['Neta carried a library book','נטע נשאה ספר ספרייה'],['beside a juice bottle','לצד בקבוק מיץ'],['inside her schoolbag.','בתוך תיק בית הספר שלה.']],
  [['On the bus,','באוטובוס,'],['the bottle opened,','הבקבוק נפתח,'],['and juice covered the book.','ומיץ כיסה את הספר.']],
  [['Several pages became wet,','כמה עמודים נרטבו,'],['and blue ink spread','ודיו כחול נמרח'],['across a picture.','על פני תמונה.']],
  [['Neta dried the cover','נטע ייבשה את הכריכה'],['with her sleeve.','בשרוול שלה.']],
  [['She planned to return the book','היא תכננה להחזיר את הספר'],['without saying anything.','בלי לומר דבר.']],
  [['At the library,','בספרייה,'],['another student asked,','תלמידה אחרת שאלה:'],['“Is my reserved book ready?”','״הספר שהזמנתי מוכן?״']],
  [['Neta saw the same title','נטע ראתה את אותה כותרת'],['on the reservation card.','בכרטיס ההזמנה.']],
  [['She held the damaged book tighter,','היא אחזה חזק יותר בספר שניזוק,'],['then walked to the librarian.','ואז ניגשה לספרנית.']],
  [['“The spill was my fault,”','״השפיכה הייתה באשמתי,״'],['she said.','אמרה.']],
  [['The librarian removed the book','הספרנית הוציאה את הספר'],['from the return cart.','מעגלת ההחזרות.']],
  [['She found another copy','היא מצאה עותק אחר'],['for the waiting student.','לתלמידה שהמתינה.']],
  [['Neta helped dry the pages,','נטע עזרה לייבש את העמודים,'],['but some stayed wavy.','אך כמה מהם נשארו גליים.']],
  [['The next Friday,','ביום שישי הבא,'],['she helped the librarian','היא עזרה לספרנית'],['cover the repaired book.','לעטוף את הספר שתוקן.']],
  [['Her next library book traveled','ספר הספרייה הבא שלה נסע'],['in a dry folder,','בתיקייה יבשה,'],['away from her drink.','הרחק מן המשקה שלה.']]
 ],
 'l2-a1-lunch-table':[
  [['Every day, Yosef ate alone','בכל יום יוסף אכל לבדו'],['beside the lunchroom window.','ליד חלון חדר האוכל.']],
  [['He often drew football shirts','לעיתים קרובות הוא צייר חולצות כדורגל'],['while he ate.','בזמן שאכל.']],
  [['Dana thought he wanted silence,','דנה חשבה שהוא רוצה שקט,'],['so she did not ask.','ולכן לא שאלה.']],
  [['On Wednesday,','ביום רביעי,'],['she carried her tray over','היא נשאה את המגש שלה אליו'],['and pointed to the empty chair.','והצביעה על הכיסא הפנוי.']],
  [['“Can I sit here?”','״אפשר לשבת כאן?״'],['she asked.','שאלה.']],
  [['Yosef nodded,','יוסף הנהן,'],['but left five minutes later.','אך יצא כעבור חמש דקות.']],
  [['Dana wondered','דנה תהתה'],['if she had bothered him.','אם היא הפריעה לו.']],
  [['The next day,','למחרת,'],['she asked him quietly.','היא שאלה אותו בשקט.']],
  [['“I had library duty,”','״הייתה לי תורנות בספרייה,״'],['Yosef said.','אמר יוסף.']],
  [['He turned his notebook','הוא סובב את המחברת שלו'],['and showed her','והראה לה'],['a new team shirt.','חולצת נבחרת חדשה.']],
  [['Dana asked about the colors,','דנה שאלה על הצבעים,'],['and Yosef explained his design.','ויוסף הסביר את העיצוב שלו.']],
  [['Two more students came over;','שני תלמידים נוספים ניגשו;'],['Yosef moved his bag','יוסף הזיז את התיק שלו'],['and made room.','ופינה מקום.']],
  [['They talked for part of lunch,','הם שוחחו בחלק מארוחת הצהריים,'],['and Yosef kept drawing.','ויוסף המשיך לצייר.']],
  [['On Friday,','ביום שישי,'],['Yosef saved one chair','יוסף שמר כיסא אחד'],['beside his notebook.','ליד המחברת שלו.']],
  [['When a new student entered alone,','כאשר תלמיד חדש נכנס לבדו,'],['Yosef lifted his tray','יוסף הרים את המגש שלו'],['and asked, “Sit with us?”','ושאל: ״שב איתנו?״']]
 ],
 'l2-a1-water-leak':[
  [['After sports practice,','אחרי אימון הספורט,'],['Lina heard water running','לינה שמעה מים זורמים'],['behind the gym.','מאחורי אולם הספורט.']],
  [['All the outdoor taps','כל הברזים החיצוניים'],['were closed.','היו סגורים.']],
  [['Her friend said,','חברתה אמרה:'],['“It may be a sprinkler.”','״אולי זאת ממטרה.״']],
  [['The ground was wet,','האדמה הייתה רטובה,'],['although it had not rained.','אף שלא ירד גשם.']],
  [['Lina placed a chalk mark','לינה סימנה קו בגיר'],['at the edge of the puddle.','בקצה השלולית.']],
  [['They told the school office','הן הודיעו למשרד בית הספר'],['and stayed away from the wall.','והתרחקו מן הקיר.']],
  [['The caretaker checked the taps,','אב הבית בדק את הברזים,'],['but found no leak.','אך לא מצא דליפה.']],
  [['The next morning,','למחרת בבוקר,'],['water had crossed the chalk line.','המים עברו את קו הגיר.']],
  [['Lina heard the same sound','לינה שמעה את אותו קול'],['under a metal cover.','מתחת למכסה מתכת.']],
  [['She called the caretaker again','היא קראה שוב לאב הבית'],['and showed both clues.','והראתה את שני הרמזים.']],
  [['He closed the nearby water line','הוא סגר את קו המים הסמוך'],['and called a plumber.','והזמין שרברב.']],
  [['The plumber found a cracked pipe','השרברב מצא צינור סדוק'],['under the path.','מתחת לשביל.']],
  [['Sports practice moved indoors','אימון הספורט עבר פנימה'],['while the path was repaired.','בזמן שהשביל תוקן.']],
  [['Some students complained,','כמה תלמידים התלוננו,'],['but the soft ground was unsafe.','אך האדמה הרכה לא הייתה בטוחה.']],
  [['The next day,','למחרת,'],['the puddle became smaller,','השלולית הצטמצמה,'],['and the sound stopped.','וקול המים נפסק.']],
  [['When Lina later heard','כאשר לינה שמעה מאוחר יותר'],['a dripping tap,','ברז מטפטף,'],['she reported it before leaving.','היא דיווחה עליו לפני שעזבה.']]
 ],
 'l2-a2-group-credit':[
  [['Ruth completed most of the research','רות השלימה את רוב המחקר'],['for the group’s science project.','לפרויקט המדעים של הקבוצה.']],
  [['Ben and Yael designed the poster','בן ויעל עיצבו את הכרזה'],['and practiced the presentation.','ותרגלו את ההצגה.']],
  [['On the final slide,','בשקופית האחרונה,'],['their names appeared first,','השמות שלהם הופיעו ראשונים,'],['and Ruth’s name was tiny.','ושמה של רות היה זעיר.']],
  [['Ruth closed her data notebook','רות סגרה את מחברת הנתונים שלה'],['without saying anything.','בלי לומר דבר.']],
  [['At the school exhibition,','בתערוכת בית הספר,'],['a judge praised Ben and Yael','שופט שיבח את בן ויעל'],['for the careful research.','על המחקר הזהיר.']],
  [['Ben accepted the praise,','בן קיבל את השבח,'],['then noticed Ruth looking down.','ואז הבחין שרות משפילה את מבטה.']],
  [['The judge asked','השופט שאל'],['why one result','מדוע תוצאה אחת'],['did not match the others.','אינה מתאימה לתוצאות האחרות.']],
  [['Ben could not explain it.','בן לא הצליח להסביר זאת.']],
  [['Ruth had repeated the experiment','רות חזרה על הניסוי'],['and found a measuring error.','ומצאה טעות במדידה.']],
  [['Ben took a breath.','בן נשם עמוק.'],['“Ruth found and corrected it,”','״רות מצאה ותיקנה את הטעות,״'],['he told the judge.','אמר לשופט.']],
  [['Ruth opened her notebook','רות פתחה את המחברת שלה'],['and explained the evidence.','והסבירה את הראיות.']],
  [['Before the awards,','לפני חלוקת הפרסים,'],['the group changed the slide','הקבוצה שינתה את השקופית'],['and listed every person’s work.','ופירטה את עבודתו של כל אחד.']],
  [['The project received a special mention,','הפרויקט קיבל ציון לשבח,'],['with all three names','ושלושת השמות הופיעו'],['on the certificate.','על התעודה.']],
  [['For the next project,','בפרויקט הבא,'],['they kept a shared task record','הם ניהלו רישום משימות משותף'],['from the first day.','מן היום הראשון.']],
  [['Ruth chose the data section','רות בחרה את חלק הנתונים'],['and presented its first sentence herself.','והציגה בעצמה את המשפט הראשון שלו.']]
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
 'l2-a2-rumor':[
  [['On Sunday evening,','ביום ראשון בערב,'],['Hila saw a screenshot','הילה ראתה צילום מסך'],['in the class chat.','בשיחה הכיתתית.']],
  [['It said that Mr. Cohen','נכתב בו שמר כהן'],['was leaving the school','עוזב את בית הספר'],['the following week.','בשבוע הבא.']],
  [['Within ten minutes,','בתוך עשר דקות,'],['students were planning','תלמידים כבר תכננו'],['a farewell card.','כרטיס פרידה.']],
  [['Hila almost forwarded it,','הילה כמעט העבירה אותו,'],['but the missing date','אבל התאריך החסר'],['made her pause.','גרם לה לעצור.']],
  [['The screenshot also ended','צילום המסך גם הסתיים'],['in the middle of a sentence.','באמצע משפט.']],
  [['“The office sent it,” Uri wrote,','״המשרד שלח את זה,״ כתב אורי,'],['although he had not seen','אף שלא ראה'],['the original.','את המקור.']],
  [['Hila opened the school notice','הילה פתחה את הודעת בית הספר'],['instead of repeating his claim.','במקום לחזור על הטענה שלו.']],
  [['The full line said','השורה המלאה אמרה'],['that Mr. Cohen was leaving','שמר כהן יוצא'],['at noon for a training course.','בצהריים לקורס הכשרה.']],
  [['He was returning to class','הוא היה אמור לחזור לכיתה'],['the next morning.','למחרת בבוקר.']],
  [['Hila’s face grew warm','פניה של הילה התחממו'],['when she saw how quickly','כשראתה כמה מהר'],['everyone had believed','כולם האמינו'],['the cropped image.','לתמונה החתוכה.']],
  [['She posted the full notice','היא פרסמה את ההודעה המלאה'],['and marked the missing words.','וסימנה את המילים החסרות.']],
  [['“I nearly shared it too,”','״גם אני כמעט שיתפתי את זה,״'],['she added.','הוסיפה.']],
  [['Uri deleted his message','אורי מחק את הודעתו'],['and placed the correction','והצמיד את התיקון'],['at the top of the chat.','לראש השיחה.']],
  [['Several students had already written','כמה תלמידים כבר כתבו'],['worried messages to the teacher.','למורה הודעות מודאגות.']],
  [['The next morning,','למחרת בבוקר,'],['they apologized','הם התנצלו'],['instead of hiding the mistake.','במקום להסתיר את הטעות.']],
  [['A week later,','שבוע לאחר מכן,'],['Hila answered a new rumor','הילה הגיבה לשמועה חדשה'],['with one question:','בשאלה אחת:'],['“Where is the full message?”','״איפה ההודעה המלאה?״']]
 ],
 'l2-a2-community-race':[
  [['The school advertised','בית הספר פרסם'],['a five-kilometer charity race','מרוץ התרמה של חמישה קילומטרים'],['around the park.','סביב הפארק.']],
  [['Tomer, who used forearm crutches,','תומר, שנעזר בקביים לאמות הידיים,'],['studied the route','בחן את המסלול'],['on the poster.','בכרזה.']],
  [['The final hill ended','הגבעה האחרונה הסתיימה'],['at a long flight of steps.','בגרם מדרגות ארוך.']],
  [['The organizers offered him','המארגנים הציעו לו'],['a place at the registration table.','מקום בשולחן ההרשמה.']],
  [['“I came to join the race,','״באתי להשתתף במרוץ,'],['not only to watch it,”','לא רק לצפות בו,״'],['he said.','אמר.']],
  [['Tomer showed them','תומר הראה להם'],['a paved loop','מסלול סלול'],['behind the sports center.','מאחורי מרכז הספורט.']],
  [['He knew it','הוא הכיר אותו'],['because he trained there','מפני שהתאמן שם'],['every Tuesday.','בכל יום שלישי.']],
  [['The committee added','הוועדה הוסיפה'],['a one-kilometer walk-and-roll route','מסלול הליכה וגלגול באורך קילומטר'],['with the same finish line.','עם אותו קו סיום.']],
  [['During the first test,','במהלך הבדיקה הראשונה,'],['a delivery van blocked','רכב משלוחים חסם'],['the narrow turn.','את הפנייה הצרה.']],
  [['Moving the barrier alone','הזזת המחסום לבדה'],['did not leave enough space.','לא השאירה די מקום.']],
  [['Tomer measured','תומר מדד'],['a wider turn','פנייה רחבה יותר'],['through the basketball court.','דרך מגרש הכדורסל.']],
  [['The runners tested it','הרצים בדקו אותה'],['with him','יחד איתו'],['before the event.','לפני האירוע.']],
  [['On race morning,','בבוקר המרוץ,'],['each participant chose','כל משתתף בחר'],['a challenging route','מסלול מאתגר'],['or an active team role.','או תפקיד פעיל בצוות.']],
  [['Tomer completed the paved loop','תומר השלים את המסלול הסלול'],['while his classmates timed','בזמן שחבריו מדדו את זמני'],['every route.','כל המסלולים.']],
  [['All routes met','כל המסלולים נפגשו'],['beneath the same finish banner.','מתחת לאותה כרזת סיום.']],
  [['The event raised more money','האירוע גייס יותר כסף'],['than the original one-route plan','מכפי שהתכנית המקורית עם מסלול אחד'],['had expected.','צפתה.']],
  [['For the next event,','לקראת האירוע הבא,'],['Tomer joined the planning committee','תומר הצטרף לוועדת התכנון'],['before the map was drawn.','לפני שצוירה המפה.']]
 ],
 'l2-es-online-challenge':[
  [['On Friday, a risky challenge filled the school’s group chats.','Many students were sharing a dangerous online activity in the school’s group chats.']],
  [['Adam’s friends wanted him to film them trying it after practice.','Friends wanted Adam to record them doing the activity after sports practice.']],
  [['The first attempt ended with a dropped phone and a scraped hand.','The first try caused a small injury and a damaged phone.']],
  [['Nobody was seriously hurt, but the short clip looked exciting.','The video looked exciting because the fall was not shown.']],
  [['Ben wanted to post only the final three seconds.','Ben wanted to share only the successful ending.']],
  [['“The fall is not in the video, so people will think this is safe,” Adam said.','Adam explained that viewers would not see the danger.']],
  [['Ben laughed and called him afraid.','Ben laughed and said Adam was too afraid.']],
  [['Adam felt his thumb move toward the record button.','Adam nearly followed the group because of the pressure.']],
  [['Then he saw two younger students waiting beside the same spot.','He noticed younger students preparing to copy them.']],
  [['One of them asked when the next video would begin.','One younger student asked when filming would begin.']],
  [['Adam locked his phone and stood in front of the camera.','Adam stopped the camera and blocked the next attempt.']],
  [['“I will not help this spread,” he said.','Adam clearly refused to help the challenge spread.']],
  [['He showed the younger students the scraped hand and asked them to leave.','He showed the real result and asked the younger students to leave.']],
  [['Ben was angry, but he did not start another attempt.','Ben remained angry but did not try again.']],
  [['Adam and Ben later told the coach the complete story.','Adam and Ben later told the coach everything that had happened.']],
  [['The coach addressed the danger without publicly embarrassing anyone.','The coach explained the danger without naming or shaming students.']],
  [['When another trend appeared, Ben asked, “What will the camera leave out?”','Later Ben questioned what a new online video might be hiding.']]
 ],
 'l2-es-energy-audit':[
  [['The school’s electricity bill rose sharply during a cool month.','The school used much more power even though the weather was not hot.']],
  [['The science club expected to find air conditioners running after lessons.','The students thought cooling machines were staying on after school.']],
  [['They checked classroom switches each afternoon, but most were already off.','They checked the rooms, but most machines had been turned off.']],
  [['Dana drew the hourly meter readings on a simple graph.','Dana made a graph that showed how much power was used each hour.']],
  [['A high line appeared every morning at four o’clock.','The graph showed a large use of power at four in the morning.']],
  [['“No students are here then,” she said.','Dana said that nobody was studying at that time.']],
  [['The caretaker explained that the hallway lights used an automatic timer.','The hallway lights turned on according to a clock.']],
  [['He believed it started at six.','The caretaker thought the lights began working at six.']],
  [['After a recent power cut, the timer showed six when it was four.','The timer clock was two hours fast after a power cut.']],
  [['The club asked an electrician to check it before anyone changed the setting.','A trained worker checked the system before any student touched it.']],
  [['He reset the clock and kept the entrance lights on for early staff.','The worker corrected the time but protected safe lighting for early workers.']],
  [['The next graph showed a smaller morning spike.','The second graph showed less unnecessary power use in the morning.']],
  [['However, two computer rooms still used power all night.','Two rooms continued using power when the school was empty.']],
  [['The staff found old charging carts that never entered sleep mode.','Old charging equipment continued working when it was not needed.']],
  [['The club tested an approved shut-down routine for one week.','The school tested a safe plan for turning off equipment.']],
  [['Teachers reported no missing files or delayed lessons.','The change did not damage work or interrupt lessons.']],
  [['Students compared the new readings with the first week.','The students compared the results before and after the changes.']],
  [['The school used less electricity without making rooms darker or hotter.','The school saved power without reducing light or comfort.']],
  [['The office posted the two graphs beside the monthly bill.','The results stayed visible beside the cost of the electricity.']],
  [['Every Friday, Dana checked the four-o’clock line before calling the audit finished.','Dana continued checking the early-morning use instead of assuming the problem was gone.']]
 ],
 'l3-a1-first-aid':[
  [['Earlier that month,','מוקדם יותר באותו חודש,'],['Shira practiced emergency calls','שירה תרגלָה שיחות חירום'],['during a first aid lesson.','בשיעור עזרה ראשונה.']],
  [['At the community fair,','ביריד הקהילתי,'],['an older visitor suddenly fell','מבקר מבוגר נפל לפתע'],['beside a chair.','ליד כיסא.']],
  [['Several people rushed toward him','כמה אנשים מיהרו אליו'],['at once.','בבת אחת.']],
  [['Shira’s hands shook,','ידיה של שירה רעדו,'],['but she remembered','אבל היא זכרה'],['the first step.','את הצעד הראשון.']],
  [['“Please give him space,”','״בבקשה תנו לו מקום,״'],['she said.','אמרה.']],
  [['She asked Daniel','היא ביקשה מדניאל'],['to call emergency services.','להתקשר לשירותי החירום.']],
  [['She asked another adult','היא ביקשה ממבוגר אחר'],['to meet the medical team','לפגוש את הצוות הרפואי'],['at the gate.','בשער.']],
  [['Shira stayed near the visitor','שירה נשארה ליד המבקר'],['and followed the operator’s instructions.','ופעלה לפי הוראות המוקדן.']],
  [['She did not try','היא לא ניסתה'],['to move him.','להזיז אותו.']],
  [['The crowd became quiet enough','הקהל נעשה שקט דיו'],['to hear his answers.','כדי לשמוע את תשובותיו.']],
  [['When the medical team arrived,','כשהצוות הרפואי הגיע,'],['Shira told them','שירה סיפרה להם'],['what happened and when.','מה קרה ומתי.']],
  [['The visitor was taken','המבקר נלקח'],['for medical care.','לקבלת טיפול רפואי.']],
  [['After the medical team left,','לאחר שהצוות הרפואי עזב,'],['Shira noticed the lesson card','שירה הבחינה בכרטיס השיעור'],['in her hand.','שבידה.']],
  [['“Practice felt different today,”','״התרגול הרגיש אחרת היום,״'],['she told her teacher.','אמרה למורה שלה.']],
  [['At the next lesson,','בשיעור הבא,'],['the class practiced the call','הכיתה תרגלָה את השיחה'],['again.','שוב.']],
  [['This time,','הפעם,'],['Shira practiced the first step','שירה תרגלָה את הצעד הראשון'],['with a new student.','עם תלמיד חדש.']]
 ],
 'l3-a1-community-library':[
  [['The town planned to close','העיר תכננה לסגור'],['the small library','את הספרייה הקטנה'],['at the end of the month.','בסוף החודש.']],
  [['Its report showed','הדוח שלה הראה'],['only a few borrowed books','שרק מעט ספרים הושאלו'],['each day.','בכל יום.']],
  [['Rina knew that many students','רינה ידעה שתלמידים רבים'],['studied there','למדו שם'],['without borrowing anything.','בלי לשאול דבר.']],
  [['She helped organize','היא עזרה לארגן'],['a reading afternoon','אחר צהריים של קריאה'],['on Tuesday.','ביום שלישי.']],
  [['Only three children came.','רק שלושה ילדים הגיעו.']],
  [['Rina folded the empty name cards','רינה קיפלה את כרטיסי השם הריקים'],['and wanted to give up.','ורצתה לוותר.']],
  [['One mother explained','אם אחת הסבירה'],['that families arrived home','שמשפחות הגיעו הביתה'],['later.','מאוחר יותר.']],
  [['The students tried','התלמידים ניסו'],['again','שוב'],['on Thursday evening.','ביום חמישי בערב.']],
  [['They added homework help','הם הוסיפו עזרה בשיעורי הבית'],['and a book exchange.','והחלפת ספרים.']],
  [['The librarian counted every visitor,','הספרנית ספרה כל מבקר,'],['not only borrowed books.','לא רק ספרים מושאלים.']],
  [['Older students read','תלמידים בוגרים קראו'],['with younger children.','עם ילדים צעירים.']],
  [['A retired neighbor helped people','שכן גמלאי עזר לאנשים'],['use the computers.','להשתמש במחשבים.']],
  [['By closing time,','עד שעת הסגירה,'],['every table was busy.','כל שולחן היה בשימוש.']],
  [['The students presented','התלמידים הציגו'],['the new visitor numbers','את מספרי המבקרים החדשים'],['and a volunteer plan.','ותכנית מתנדבים.']],
  [['The town delayed the closure','העיר דחתה את הסגירה'],['for a three-month trial.','לתקופת ניסיון של שלושה חודשים.']],
  [['The library was not saved','הספרייה לא ניצלה'],['by one busy evening.','בזכות ערב עמוס אחד.']],
  [['Each Thursday,','בכל יום חמישי,'],['Rina opened','רינה פתחה'],['the box of name cards','את קופסת כרטיסי השם'],['before the first family arrived.','לפני הגעת המשפחה הראשונה.']]
 ],
 'l3-a1-water-shortage':[
  [['A dry winter made the town','חורף יבש אילץ את העיר'],['limit water use.','להגביל את השימוש במים.']],
  [['The school had','לבית הספר היו'],['a vegetable garden,','גינת ירק,'],['shade trees,','עצי צל'],['and a large lawn.','ומדשאה גדולה.']],
  [['Some students wanted','כמה תלמידים רצו'],['to stop watering everything.','להפסיק להשקות הכול.']],
  [['Others rejected','אחרים דחו'],['every limit.','כל הגבלה.']],
  [['Yael asked the gardener','יעל שאלה את הגנן'],['what would happen','מה יקרה'],['to each area.','לכל אזור.']],
  [['The young shade trees needed','עצי הצל הצעירים נזקקו'],['a small amount of water','לכמות קטנה של מים'],['to survive.','כדי לשרוד.']],
  [['The lawn used far more water','המדשאה השתמשה בהרבה יותר מים'],['and could grow back later.','ויכלה לצמוח שוב מאוחר יותר.']],
  [['A broken tap beside the lawn','ברז שבור ליד המדשאה'],['also leaked all night.','גם דלף כל הלילה.']],
  [['“We should repair waste','״עלינו לתקן בזבוז'],['before cutting every useful drop,”','לפני שנבטל כל טיפה מועילה,״'],['Yael said.','אמרה יעל.']],
  [['The school repaired the tap','בית הספר תיקן את הברז'],['and stopped watering the lawn.','והפסיק להשקות את המדשאה.']],
  [['The school kept','בית הספר שמר'],['a limited amount of water','כמות מוגבלת של מים'],['for drinking, cleaning, young trees','לשתייה, לניקיון ולעצים הצעירים'],['and part of the garden.','ולחלק מהגינה.']],
  [['The school lawn became brown.','מדשאת בית הספר נעשתה חומה.']],
  [['Some students complained','כמה תלמידים התלוננו'],['when it looked less attractive.','כשהיא נראתה פחות יפה.']],
  [['Yael showed them','יעל הראתה להם'],['the weekly water meter.','את מד המים השבועי.']],
  [['The school had cut its use','בית הספר צמצם את השימוש'],['without losing the trees.','בלי לאבד את העצים.']],
  [['The garden produced fewer vegetables,','הגינה הניבה פחות ירקות,'],['but it still supplied','אבל עדיין סיפקה אותם'],['the cooking club.','לחוג הבישול.']],
  [['When rain finally came,','כשהגשם הגיע לבסוף,'],['the plan was reviewed','התכנית נבדקה מחדש'],['instead of forgotten.','במקום להישכח.']],
  [['The next dry month began','החודש היבש הבא התחיל'],['with the meter reading,','בקריאת המד,'],['not an argument.','לא בוויכוח.']]
 ],
 'l3-a2-ai-homework':[
  [['A writing tool produced','כלי כתיבה יצר'],['a polished essay for Erez','עבור ארז חיבור מלוטש'],['in a few seconds.','בתוך שניות אחדות.']],
  [['He changed the title','הוא שינה את הכותרת'],['and submitted the rest','והגיש את השאר'],['as his own work.','כעבודה שלו.']],
  [['The essay received','החיבור קיבל'],['the highest grade','את הציון הגבוה ביותר'],['in the class.','בכיתה.']],
  [['During the next lesson,','בשיעור הבא,'],['the teacher asked Erez','המורה ביקשה מארז'],['to explain one paragraph.','להסביר פסקה אחת.']],
  [['He read it twice,','הוא קרא אותה פעמיים,'],['but could not explain','אבל לא הצליח להסביר'],['its main idea.','את הרעיון המרכזי שלה.']],
  [['The unfamiliar words sounded','המילים הלא מוכרות נשמעו'],['even stranger','זרות עוד יותר'],['in his voice.','בקולו.']],
  [['After class,','לאחר השיעור,'],['the teacher asked','המורה שאלה'],['how he had written the essay.','כיצד כתב את החיבור.']],
  [['Erez prepared an excuse,','ארז הכין תירוץ,'],['then closed the file.','ואז סגר את הקובץ.']],
  [['“The tool wrote most of it,”','״הכלי כתב את רובו,״'],['he admitted.','הודה.']],
  [['The teacher canceled the grade','המורה ביטלה את הציון'],['but offered a new assignment.','אבל הציעה מטלה חדשה.']],
  [['Erez had to show his notes','ארז נדרש להציג את ההערות שלו'],['and explain any digital help','ולהסביר כל עזרה דיגיטלית'],['he used.','שבה השתמש.']],
  [['He wrote a rough first draft','הוא כתב טיוטה ראשונה לא מלוטשת'],['before opening the tool.','לפני שפתח את הכלי.']],
  [['This time,','הפעם,'],['he used it to check grammar','הוא השתמש בו כדי לבדוק דקדוק'],['and ask questions.','ולשאול שאלות.']],
  [['He rejected two suggestions','הוא דחה שתי הצעות'],['that changed his meaning.','ששינו את המשמעות שלו.']],
  [['The new essay was shorter','החיבור החדש היה קצר יותר'],['and not as polished.','ולא מלוטש באותה מידה.']],
  [['Erez explained every paragraph','ארז הסביר כל פסקה'],['without looking at the screen.','בלי להביט במסך.']],
  [['Before the next assignment,','לפני המטלה הבאה,'],['he typed his own first sentence.','הוא הקליד בעצמו את המשפט הראשון.']]
 ],
 'l3-a2-witness':[
  [['After basketball practice,','לאחר אימון הכדורסל,'],['Tal saw Yoni carrying','טל ראה את יוני נושא'],['all the team equipment','את כל ציוד הקבוצה'],['again.','שוב.']],
  [['Two older players called it','שני שחקנים מבוגרים יותר קראו לזה'],['“the quiet player’s job.”','״התפקיד של השחקן השקט״.']],
  [['When Yoni asked for help,','כשיוני ביקש עזרה,'],['they imitated his voice','הם חיקו את קולו'],['and laughed.','וצחקו.']],
  [['Tal was their friend','טל היה חבר שלהם'],['and wanted to keep','ורצה לשמור'],['his place on the team.','על מקומו בקבוצה.']],
  [['“It is only a joke,”','״זו רק בדיחה,״'],['one player warned him.','הזהיר אותו אחד השחקנים.']],
  [['Tal said nothing,','טל לא אמר דבר,'],['and Yoni carried the bags','ויוני נשא את התיקים'],['to the storeroom.','למחסן.']],
  [['That night,','באותו לילה,'],['Tal wrote down exactly','טל כתב בדיוק'],['what he had seen.','מה ראה.']],
  [['At the next practice,','באימון הבא,'],['they pushed the equipment cart','הם דחפו את עגלת הציוד'],['toward Yoni and walked away.','לעבר יוני והתרחקו.']],
  [['Tal’s stomach tightened','בטנו של טל התכווצה'],['when Yoni looked at the floor.','כשיוני הביט ברצפה.']],
  [['He asked Yoni quietly,','הוא שאל את יוני בשקט,'],['“Do you want me','״אתה רוצה'],['to come with you','שאבוא איתך'],['to the coach?”','למאמן?״']],
  [['Yoni nodded.','יוני הנהן.'],['“I just want it to stop.”','״אני רק רוצה שזה ייפסק.״']],
  [['The two friends waited','שני החברים המתינו'],['outside the coach’s office.','מחוץ למשרד המאמן.']],
  [['Tal almost turned back','טל כמעט חזר לאחור'],['when he heard the older players','כששמע את השחקנים המבוגרים'],['inside the gym.','בתוך האולם.']],
  [['Then he gave the coach','ואז הוא מסר למאמן'],['the dates and exact words.','את התאריכים ואת המילים המדויקות.']],
  [['The coach spoke','המאמן שוחח'],['to each student separately','עם כל תלמיד בנפרד'],['and began a fair review.','והתחיל בירור הוגן.']],
  [['The next practice began','האימון הבא התחיל'],['with equipment duties','בחלוקת תפקידי הציוד'],['shared by everyone.','בין כולם.']],
  [['The two older players','שני השחקנים המבוגרים'],['were angry with Tal','כעסו על טל'],['and did not apologize at once.','ולא התנצלו מיד.']],
  [['Tal still sat beside Yoni','טל בכל זאת ישב ליד יוני'],['while the team waited','בזמן שהקבוצה המתינה'],['for the gym to open.','לפתיחת האולם.']],
  [['When the equipment cart appeared,','כשהופיעה עגלת הציוד,'],['three players reached for it.','שלושה שחקנים הושיטו אליה יד.']]
 ],
 'l2-es-accessible-trip':[
  [['The class chose a mountain trail for its annual trip.','The class selected a mountain walk for the yearly trip.']],
  [['Part of the route was inaccessible to Maya,','Maya used a wheelchair'],['who used a wheelchair.','and could not use part of the route.']],
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
  [['At the viewpoint, Maya folded the map beside the group’s backpacks.','At the viewpoint, Maya put away the map beside the group’s bags.']],
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
 ],
 'l3-a2-food-waste':[
  [['On Monday, Neta watched','ביום שני נטע ראתה'],['food from three full trays fall','מזון משלושה מגשים מלאים נופל'],['into the cafeteria bin.','אל פח חדר האוכל.']],
  [['The eco committee had promised','הוועדה הסביבתית הבטיחה'],['to cut food waste','לצמצם את בזבוז המזון'],['before the spring fair.','לפני יריד האביב.']],
  [['Their first idea was','הרעיון הראשון שלהם היה'],['to donate every leftover meal.','לתרום כל ארוחה שנותרה.']],
  [['The kitchen manager shook his head:','מנהל המטבח הניד בראשו:'],['food already served could not','מזון שכבר הוגש לא יכול היה'],['leave the cafeteria safely.','לצאת בבטחה מחדר האוכל.']],
  [['Neta’s cheeks warmed','לחייה של נטע התחממו'],['when classmates called','כאשר חברים לכיתה קראו'],['the project useless.','למיזם חסר תועלת.']],
  [['Then she noticed','אז היא הבחינה'],['the same large serving','באותה מנה גדולה'],['on every tray.','על כל מגש.']],
  [['She asked the kitchen staff','היא ביקשה מצוות המטבח'],['to weigh waste from','לשקול בנפרד פסולת'],['small and large portions separately.','ממנות קטנות וגדולות.']],
  [['For one week, students chose','במשך שבוע התלמידים בחרו'],['a blue card for','כרטיס כחול'],['a small serving','למנה קטנה'],['or a green card','או כרטיס ירוק'],['for a full one.','למנה מלאה.']],
  [['Nobody had to explain','איש לא נדרש להסביר'],['how hungry they were.','עד כמה היה רעב.']],
  [['On the first test day,','ביום הניסוי הראשון,'],['the lunch line moved slowly,','התור לארוחה התקדם באטיות,'],['and several students chose','וכמה תלמידים בחרו'],['the wrong card.','בכרטיס הלא נכון.']],
  [['Neta nearly canceled the test','נטע כמעט ביטלה את הניסוי'],['when the bin filled again.','כאשר הפח התמלא שוב.']],
  [['Amir pointed to the tally sheet:','אמיר הצביע על דף הספירה:'],['most waste came from','רוב הפסולת הגיעה'],['one unpopular dish,','ממנה אחת שלא הייתה אהובה,'],['not from small servings.','לא ממנות קטנות.']],
  [['The committee changed Friday’s menu','הוועדה שינתה את תפריט יום שישי'],['and added a station','והוסיפה עמדה'],['for second servings.','למנות נוספות.']],
  [['They also placed unopened fruit cups','הם גם הניחו גביעי פירות סגורים'],['in a clean donation crate.','בארגז תרומה נקי.']],
  [['At the final lunch,','בארוחה האחרונה,'],['the manager rolled the waste bin','המנהל גלגל את פח הפסולת'],['onto the scale.','אל המשקל.']],
  [['The number had fallen','המספר ירד'],['from thirty-two kilograms','משלושים ושניים קילוגרמים'],['to thirteen.','לשלושה עשר.']],
  [['A younger student quietly returned','תלמיד צעיר יותר חזר בשקט'],['for a second serving','למנה נוספת'],['instead of taking too much','במקום לקחת יותר מדי'],['the first time.','בפעם הראשונה.']],
  [['The local shelter accepted','המקלט המקומי קיבל'],['the sealed fruit cups','את גביעי הפירות הסגורים'],['that afternoon.','באותו אחר צהריים.']],
  [['The plan had not saved','התכנית לא הצילה'],['every meal,','כל ארוחה,'],['but it protected safety','אך היא שמרה על בטיחות'],['and personal choice.','ועל בחירה אישית.']],
  [['Neta pinned the two weight tickets','נטע הצמידה את שני פתקי המשקל'],['beside the next week’s menu.','לצד תפריט השבוע הבא.']]
 ],
 'l3-es-captain-choice':[
  [['Eight minutes before the semifinal, Maya heard a sharp insult from the tunnel.','Shortly before the semifinal, Maya heard an insulting comment from the tunnel.']],
  [['Eitan, the team’s leading scorer, had mocked reserve forward Gil after a missed shot.','Eitan was the team’s best scorer, and he insulted reserve player Gil after Gil missed a shot.']],
  [['The team rule was explicit: a personal insult meant sitting out the next match.','The team had a clear rule that an insulting player could not play in the next game.']],
  [['Two reserve players had already accepted that consequence earlier in the season.','Two reserve players had already received the same consequence.']],
  [['Yet this match would decide whether the team reached the national final.','Winning this game would take the team to the national final.']],
  [['Outside, supporters chanted Eitan’s name while Maya gripped the folded lineup.','People outside called Eitan’s name while Maya held the team list tightly.']],
  [['Eitan apologized quickly, then added, “Gil knows I was under pressure.”','Eitan said sorry but also used the pressure as an excuse.']],
  [['Gil studied the tape around his wrist and said nothing.','Gil looked at his wrist tape and stayed silent.']],
  [['Ignoring the insult could protect the team’s best chance of winning.','Allowing Eitan to play would make a victory more likely.']],
  [['Enforcing the rule could end their season.','Following the rule might cause the team to lose.']],
  [['Maya asked Gil whether he wanted the incident discussed before the whole team.','Maya asked Gil whether he wanted everyone to discuss what happened.']],
  [['“I want the rule to mean the same thing when we need him,” Gil replied.','Gil wanted the rule to apply even when the team needed its best player.']],
  [['Only then did Maya recognize what an exception would tell every reserve player.','Maya understood that an exception would make the rule unfair to the reserve players.']],
  [['She recommended that Eitan sit out, exactly as the others had.','She advised the coach to give Eitan the same consequence as the others.']],
  [['The coach accepted her recommendation and signed the change himself.','The adult coach made the final decision and changed the team list.']],
  [['Without Eitan, the team created chances but did not score.','The team played without Eitan and could not score.']],
  [['Gil’s final shot struck the post, and they lost one–nil.','Gil almost scored at the end, but the team lost by one goal.']],
  [['In the silent locker room, Eitan returned Gil’s fallen water bottle and said, “The rule was mine too.”','After the loss, Eitan helped Gil and accepted that the rule also applied to him.']],
  [['At the next practice, he apologized again without using pressure as an excuse.','At the next practice, Eitan apologized without defending his behavior.']],
  [['Maya placed the losing lineup beside the team rules instead of hiding it behind the trophies.','Maya kept the losing team list beside the rules as a visible reminder.']]
 ],
 'l3-es-private-donation':[
  [['The student council learned that a family at school needed groceries after an unexpected medical crisis.','The student council heard that a school family needed food after a sudden health problem.']],
  [['The counselor shared no name and asked them to protect the family’s privacy.','The counselor did not name the family and asked the students to keep the family private.']],
  [['Amir immediately designed a bright fundraiser poster for the front gate.','Amir quickly made a public poster to collect money.']],
  [['He added a grade level, a hospital reference, and a family size gathered from hallway rumors.','Amir added identifying details that he had heard from other students.']],
  [['Roni recognized the family from those details, although nobody else did.','Roni knew who the family was because of the details.']],
  [['She said the poster should not be displayed, but she would not explain why.','Roni opposed the poster but did not give a reason.']],
  [['Amir treated her silence as indifference.','Amir wrongly believed that Roni did not care.']],
  [['“Doing nothing also causes harm,” he told her.','Amir said that refusing to act would also hurt the family.']],
  [['Roni folded the poster until the family details disappeared inside it.','Roni folded the poster so its private details could no longer be seen.']],
  [['During lunch, she asked Amir to meet the counselor privately.','Roni invited Amir to a private meeting with the counselor.']],
  [['There, Roni explained that the family’s daughter had already stopped attending clubs to avoid questions.','Roni explained that the daughter was already avoiding activities because she feared questions.']],
  [['Amir reread his poster and saw that a missing name did not make the family anonymous.','Amir realized that people could identify the family without seeing its name.']],
  [['The council faced a deadline: the grocery card was needed by Friday.','The family needed a food card before Friday.']],
  [['A public collection might raise money quickly, but it could expose the receiver.','Public fundraising could be fast but might reveal the family.']],
  [['A private appeal might protect dignity, but it would reach fewer donors.','A private request would protect the family but reach fewer people.']],
  [['They gave the counselor a short message describing the need without year-group or family clues.','They wrote a new message that explained the need without revealing identifying details.']],
  [['A trusted community organization sent it to regular donors and held the funds.','A reliable organization shared the private request and collected the money.']],
  [['By Thursday evening, enough money had arrived for the grocery card.','The organization collected enough money before Friday.']],
  [['Amir wanted to announce the total at assembly, then stopped when Roni shook her head.','Amir nearly made a public announcement but remembered the need for privacy.']],
  [['The counselor delivered the card in a plain envelope during a private meeting.','The counselor gave the food card privately in a simple envelope.']],
  [['The original poster remained folded in Amir’s notebook as a measure of how easily help can become exposure.','Amir kept the folded poster as a reminder that public help can reveal private information.']]
 ],
 'l3-es-clean-transport':[
  [['At 7:55 each morning, cars filled the narrow street outside the school gate.','Every morning, many cars crowded the narrow street by the school.']],
  [['Exhaust hung between the buildings, and students stepped between moving vehicles.','Dirty air remained near the buildings while students crossed between moving cars.']],
  [['Yael’s science club recorded its highest pollution reading beside the crossing.','Yael’s group measured the worst air pollution near the crossing.']],
  [['She proposed a thirty-minute ban on all private cars.','Yael suggested stopping all private cars for thirty minutes.']],
  [['Omer opposed it because the accessible taxi carrying his sister Lia needed the front gate.','Omer objected because his sister used a wheelchair and needed a taxi at the accessible gate.']],
  [['Yael heard a defense of convenience; Omer heard a plan that treated access as an afterthought.','Yael thought Omer defended comfort, while Omer thought Yael had forgotten access.']],
  [['Their public debate ended with louder applause but no usable proposal.','The debate attracted support but produced no practical plan.']],
  [['The principal gave them one week to design a joint trial or abandon the change.','The principal asked them to make one shared test plan within a week.']],
  [['Omer invited Yael to travel the route with Lia the next morning.','Omer asked Yael to experience Lia’s route with them.']],
  [['The rear entrance had a ramp, but a delivery van blocked it for sixteen minutes.','A delivery vehicle blocked the ramp at the back entrance.']],
  [['Yael then showed them how idling cars hid younger students from drivers at the front crossing.','Yael showed how waiting cars made younger students hard for drivers to see.']],
  [['Each problem weakened one of their original positions.','Both students learned that their first plans were incomplete.']],
  [['They counted vehicles, timed stops, and marked every safe curb on a shared map.','They collected traffic information and marked safe places on one map.']],
  [['A city officer confirmed that emergency and accessible vehicles could receive permits.','A city worker explained that necessary vehicles could receive permission to enter.']],
  [['A nearby sports center offered its turning area as a supervised drop-off point.','A sports center offered a nearby place where most cars could stop safely.']],
  [['Their revised plan closed the street to ordinary cars from 7:45 to 8:15.','Their new plan stopped ordinary cars during the busiest half hour.']],
  [['It kept a marked lane for permitted vehicles and added volunteers at both crossings.','The plan kept one lane for necessary vehicles and placed helpers at the crossings.']],
  [['On the first rainy morning, an impatient driver moved a barrier and entered the closed street.','During rain, one driver moved a barrier and entered the protected area.']],
  [['Yael started toward the car, but Omer called the supervisor instead.','Yael wanted to approach the driver, but Omer called the responsible adult.']],
  [['The lane was restored before Lia’s taxi arrived.','The safe lane was clear again before Lia arrived.']],
  [['After two weeks, ordinary car traffic had fallen by a third, while every permitted ride reached the accessible gate.','The test reduced normal car traffic and still allowed every necessary ride to reach the gate.']],
  [['The trial added a cost: three adults had to supervise it each morning.','The safer plan required three adults to help every morning.']],
  [['At the next debate, Yael and Omer presented the same map, with both their names in one corner.','At the next meeting, Yael and Omer presented their shared map together.']]
 ],
 'new-1-a1-helmet-handlebar':[
  [['Dan left his helmet','דן השאיר את הקסדה שלו'],['on the handlebar outside his home.','על הכידון מחוץ לביתו.']],
  [['“It is only two streets away,”','״זה במרחק שני רחובות בלבד,״'],['he told his sister.','אמר לאחותו.']],
  [['He began riding','הוא התחיל לרכוב'],['with the helmet swinging','כשהקסדה מתנדנדת'],['from the handlebar.','מן הכידון.']],
  [['A ball rolled','כדור התגלגל'],['into the bicycle path.','אל שביל האופניים.']],
  [['Dan stopped quickly','דן עצר במהירות'],['and fell onto the grass.','ונפל על הדשא.']],
  [['He scraped his hand,','ידו נשרטה,'],['and the helmet lay','והקסדה שכבה'],['beside the bicycle.','ליד האופניים.']],
  [['The next morning,','למחרת בבוקר,'],['he fastened the helmet','הוא הידק את הקסדה'],['before touching the pedals.','לפני שנגע בדוושות.']],
  [['His sister heard the click','אחותו שמעה את הנקישה'],['and opened the gate.','ופתחה את השער.']]
 ],
 'new-1-a1-wrong-classroom':[
  [['After the bell, Nadav followed','לאחר הצלצול נדב הלך בעקבות'],['two older students upstairs.','שני תלמידים מבוגרים יותר למעלה.']],
  [['He entered room eighteen','הוא נכנס לחדר שמונה עשרה'],['and sat near the door.','והתיישב ליד הדלת.']],
  [['The board said “Grade Nine Science,”','על הלוח נכתב ״מדעים לכיתה ט׳,״'],['but Nadav needed','אבל נדב היה צריך'],['Grade Seven English.','אנגלית לכיתה ז׳.']],
  [['His face grew warm,','פניו התחממו,'],['and he closed his schedule.','והוא סגר את מערכת השעות.']],
  [['When the teacher asked his name,','כאשר המורה שאל לשמו,'],['he whispered,','הוא לחש:'],['“I am in the wrong room.”','״אני בחדר הלא נכון.״']],
  [['A student named Adam','תלמיד בשם אדם'],['checked Nadav’s schedule','בדק את המערכת של נדב'],['without laughing.','בלי לצחוק.']],
  [['“English is in room twelve.','״אנגלית בחדר שתים עשרה.'],['I will show you,”','אני אראה לך,״'],['Adam said.','אמר אדם.']],
  [['They reached the class','הם הגיעו לכיתה'],['before the first activity ended.','לפני שהפעילות הראשונה הסתיימה.']],
  [['The next day, Nadav kept','למחרת נדב השאיר'],['his schedule open','את המערכת פתוחה'],['and showed another new student the way.','והראה לתלמיד חדש אחר את הדרך.']]
 ],
 'new-1-a1-missing-notebook':[
  [['Before English class, Maya opened','לפני שיעור אנגלית מאיה פתחה'],['her school bag.','את תיק בית הספר שלה.']],
  [['Her red notebook was not there.','המחברת האדומה שלה לא הייתה שם.']],
  [['She checked her desk','היא בדקה את השולחן שלה'],['and locker twice.','ואת התא פעמיים.']],
  [['The teacher began','המורה התחילה'],['giving out quiz papers.','לחלק את דפי הבוחן.']],
  [['Maya remembered reading','מאיה נזכרה שקראה'],['beside the library window','ליד חלון הספרייה'],['at lunch.','בזמן ארוחת הצהריים.']],
  [['Her classmate Dana said,','חברתה דנה אמרה:'],['“I saw a red notebook','״ראיתי מחברת אדומה'],['near the map shelf.”','ליד מדף המפות.״']],
  [['Maya asked the teacher','מאיה שאלה את המורה'],['if she could go','אם תוכל לצאת'],['and hurried to the library.','ומיהרה אל הספרייה.']],
  [['The librarian lifted the notebook','הספרנית הרימה את המחברת'],['from the return cart.','מעגלת ההחזרות.']],
  [['Maya reached class','מאיה הגיעה לכיתה'],['just as her name was called.','בדיוק כשקראו בשמה.']],
  [['That afternoon, she placed','באותו אחר צהריים היא הדביקה'],['a bright blue label','מדבקה כחולה ובולטת'],['on every school notebook.','על כל מחברת לימוד.']]
 ],
 'new-1-a1-class-pet':[
  [['The class welcomed','הכיתה קיבלה בברכה'],['a small hamster named Miso.','אוגר קטן בשם מיסו.']],
  [['Students made a chart','התלמידים הכינו טבלה'],['for food, water, and cleaning.','למזון, למים ולניקיון.']],
  [['Because Hila was quiet,','מפני שהילה הייתה שקטה,'],['the group gave her','הקבוצה נתנה לה'],['only the date-writing job.','רק את תפקיד כתיבת התאריכים.']],
  [['On Tuesday, Miso did not touch','ביום שלישי מיסו לא נגע'],['the apple pieces.','בחתיכות התפוח.']],
  [['Two students wanted','שני תלמידים רצו'],['to add more food.','להוסיף עוד מזון.']],
  [['Hila noticed','הילה הבחינה'],['that the water bottle','שבקבוק המים'],['made no bubbles.','לא יצר בועות.']],
  [['“The tube may be blocked,”','״ייתכן שהצינור חסום,״'],['she said.','אמרה.']],
  [['The teacher checked the bottle','המורה בדקה את הבקבוק'],['and found a seed','ומצאה זרע'],['inside the tube.','בתוך הצינור.']],
  [['After clean water flowed,','לאחר שמים נקיים זרמו,'],['Miso drank for a long time.','מיסו שתה זמן רב.']],
  [['By afternoon,','עד אחר הצהריים,'],['it ran on the wheel again.','הוא שוב רץ בגלגל.']],
  [['The class asked Hila','הכיתה ביקשה מהילה'],['to lead the daily health check.','להוביל את בדיקת הבריאות היומית.']],
  [['The next group watched','הקבוצה הבאה בדקה'],['for bubbles','אם יש בועות'],['before adding food.','לפני שהוסיפה מזון.']]
 ],
 'new-1-a1-one-more-video':[
  [['Lior planned to watch','ליאור תכנן לצפות'],['one short video','בסרטון קצר אחד'],['before homework.','לפני שיעורי הבית.']],
  [['The next video','הסרטון הבא'],['started automatically.','התחיל באופן אוטומטי.']],
  [['“I will stop after this one,”','״אפסיק אחרי הסרטון הזה,״'],['he said.','אמר.']],
  [['A third video began','סרטון שלישי התחיל'],['before he could close the app.','לפני שהספיק לסגור את האפליקציה.']],
  [['The room became dark,','החדר נעשה חשוך,'],['but the phone stayed bright.','אבל הטלפון נשאר מואר.']],
  [['His friend sent a message:','חברו שלח הודעה:'],['“Are you ready','״האם אתה מוכן'],['for tomorrow’s English quiz?”','לבוחן באנגלית מחר?״']],
  [['Lior looked','ליאור הביט'],['at his unopened notebook.','במחברת שלא פתח.']],
  [['He wanted to tap','הוא רצה ללחוץ על'],['the next video.','הסרטון הבא.']],
  [['Instead, he turned off autoplay','במקום זאת הוא כיבה את ההפעלה האוטומטית'],['and left the phone','והשאיר את הטלפון'],['in the kitchen.','במטבח.']],
  [['He had only thirty minutes','נותרו לו רק שלושים דקות'],['before bedtime.','לפני שעת השינה.']],
  [['He finished the English task','הוא סיים את המשימה באנגלית'],['but missed the basketball game outside.','אבל החמיץ את משחק הכדורסל בחוץ.']],
  [['The next day, he set','למחרת הוא כיוון'],['a ten-minute timer','טיימר לעשר דקות'],['before the first video.','לפני הסרטון הראשון.']],
  [['When the timer rang,','כשהטיימר צלצל,'],['he closed the app','הוא סגר את האפליקציה'],['before autoplay began.','לפני שההפעלה האוטומטית התחילה.']]
 ],
'new-1-a2-one-scooter-two-friends':[
  [['Tomer unlocked his electric scooter','תומר פתח את נעילת הקורקינט החשמלי שלו'],['outside school and said,','מחוץ לבית הספר ואמר:'],['“We can both ride home.”','״שנינו יכולים לרכוב הביתה.״']],
  [['He had only one helmet,','הייתה לו רק קסדה אחת,'],['and the game at the park','והמשחק בפארק'],['was starting in ten minutes.','עמד להתחיל בתוך עשר דקות.']],
  [['Amit placed one foot','עמית הניח רגל אחת'],['on the back of the scooter.','בחלק האחורי של הקורקינט.'],['The road ahead','הכביש שלפניהם'],['looked narrow.','נראה צר.']],
  [['“It is only two streets,” Tomer said,','״זה רק שני רחובות,״ אמר תומר,'],['while two classmates waited.','בזמן ששני חברים לכיתה המתינו.']],
  [['Amit gripped his bag tightly','עמית אחז בחוזקה בתיקו'],['and stepped back.','וצעד לאחור.'],['“No. This scooter','״לא. הקורקינט הזה'],['is for one rider.”','מיועד לרוכב אחד.״']],
  [['Tomer frowned,','תומר הזעיף פנים,'],['but he stepped off','אך הוא ירד'],['and began walking the scooter.','והתחיל להוליך את הקורקינט.']],
  [['At the crossing,','במעבר החצייה,'],['a traffic officer saw them walking','שוטר תנועה ראה אותם הולכים'],['and explained that two riders','והסביר ששני רוכבים'],['could be injured or receive a fine.','עלולים להיפצע או לקבל קנס.']],
  [['They reached the park late,','הם הגיעו לפארק באיחור,'],['and the first game had ended,','והמשחק הראשון כבר הסתיים,'],['but they had avoided the risk.','אך הם נמנעו מהסיכון.']],
  [['The following Friday,','ביום שישי הבא,'],['they chose the bus','הם בחרו באוטובוס'],['and left the scooter','והשאירו את הקורקינט'],['at home.','בבית.']]
 ],
 'new-1-a2-unequal-group':[
  [['Maya stayed after class','מאיה נשארה לאחר השיעור'],['to finish the group’s science model.','כדי לסיים את דגם המדעים של הקבוצה.']],
  [['On presentation day,','ביום ההצגה,'],['Ron and Gal expected','רון וגל ציפו'],['the same credit as Maya.','לקבל אותה הכרה כמו מאיה.']],
  [['When the motor would not start,','כאשר המנוע לא פעל,'],['the teacher asked','המורה שאלה'],['who had connected the wires.','מי חיבר את החוטים.']],
  [['Ron looked at Maya’s notes','רון הביט בסיכומים של מאיה'],['but could not explain them.','אך לא הצליח להסביר אותם.']],
  [['Maya closed her notebook.','מאיה סגרה את מחברתה.'],['“I can fix it,','״אני יכולה לתקן את זה,'],['but I will not pretend','אבל לא אעמיד פנים'],['we shared the work.”','שחלקנו את העבודה.״']],
  [['The room went quiet,','החדר השתתק,'],['and Ron admitted','ורון הודה'],['that Maya had done almost everything.','שמאיה עשתה כמעט הכול.']],
  [['The teacher gave the group','המורה נתנה לקבוצה'],['one more day','יום נוסף'],['before grading the project.','לפני שנתנה ציון לפרויקט.']],
  [['Maya showed the others','מאיה הראתה לאחרים'],['how to test each connection;','כיצד לבדוק כל חיבור;'],['Ron rewired the switch,','רון חיבר מחדש את המתג,'],['and Gal prepared the explanation.','וגל הכין את ההסבר.']],
  [['At the second presentation,','בהצגה השנייה,'],['each student described','כל תלמיד תיאר'],['a part they had completed.','חלק שהשלים.']],
  [['The model moved across the table,','הדגם נע על השולחן,'],['beside a task sheet','ולצדו גיליון משימות'],['with three names and three different jobs.','עם שלושה שמות ושלושה תפקידים שונים.']]
 ],
 'new-1-a2-new-bus-route':[
  [['A new bus route','קו אוטובוס חדש'],['shortened the trip to school','קיצר את הנסיעה לבית הספר'],['for most students.','עבור רוב התלמידים.']],
  [['However, it no longer stopped','אולם הוא כבר לא עצר'],['near the community clinic.','ליד המרפאה הקהילתית.']],
  [['Lina noticed three older passengers','לינה הבחינה בשלושה נוסעים מבוגרים'],['waiting beside the old stop','ממתינים ליד התחנה הישנה'],['after the new bus passed.','לאחר שהאוטובוס החדש חלף.']],
  [['The timetable said','לוח הזמנים קבע'],['the route was seven minutes faster,','שהמסלול מהיר בשבע דקות,'],['so some students called it an improvement.','ולכן כמה תלמידים כינו אותו שיפור.']],
  [['Lina and Omar rode the route','לינה ועומר נסעו במסלול'],['on three different mornings','בשלושה בקרים שונים'],['and recorded each stop.','ותיעדו כל תחנה.']],
  [['They asked passengers','הם שאלו נוסעים'],['which stop they used','באיזו תחנה הם השתמשו'],['and why it mattered.','ומדוע היא חשובה.']],
  [['Their notes showed that','הרישומים שלהם הראו'],['the saved time came partly','שהזמן שנחסך נבע בחלקו'],['from skipping the clinic.','מן הדילוג על המרפאה.']],
  [['At the transport meeting,','בפגישת התחבורה,'],['Lina presented the times,','לינה הציגה את הזמנים,'],['and Omar read two passenger comments.','ועומר קרא שתי תגובות של נוסעים.']],
  [['The bus company tested','חברת האוטובוסים ניסתה'],['one stop near the clinic','תחנה אחת ליד המרפאה'],['each morning for two weeks.','בכל בוקר במשך שבועיים.']],
  [['The trip became four minutes longer,','הנסיעה התארכה בארבע דקות,'],['but fewer passengers','אך פחות נוסעים'],['had to walk uphill.','נאלצו ללכת במעלה הגבעה.']],
  [['When the trial ended,','כאשר הניסוי הסתיים,'],['the revised timetable kept the stop','לוח הזמנים המתוקן שמר על התחנה'],['during clinic hours.','בשעות פעילות המרפאה.']]
 ],
 'new-1-a2-unfair-team-choice':[
  [['During every football lesson,','בכל שיעור כדורגל,'],['captains Ron and Yair','הקפטנים רון ויאיר'],['chose their closest friends first.','בחרו תחילה את חבריהם הקרובים ביותר.']],
  [['Niv and two other students','ניב ושני תלמידים אחרים'],['were usually chosen last','נבחרו בדרך כלל אחרונים'],['and given no clear position.','ולא קיבלו עמדה ברורה.']],
  [['One Friday,','ביום שישי אחד,'],['the teacher asked Niv','המורה ביקש מניב'],['and another student','ומתלמיד נוסף'],['who was often chosen last','שלעיתים קרובות נבחר אחרון'],['to become captains.','להיות קפטנים.']],
  [['Ron whispered,','רון לחש:'],['“Now they will choose us last.”','״עכשיו הם יבחרו בנו אחרונים.״']],
  [['Niv looked at the class list','ניב הביט ברשימת הכיתה'],['and asked each student','ושאל כל תלמיד'],['which position he could play.','באיזו עמדה הוא יכול לשחק.']],
  [['He built two balanced teams','הוא בנה שתי קבוצות מאוזנות'],['instead of copying','במקום להעתיק'],['the old friendship groups.','את קבוצות החברים הישנות.']],
  [['Yair received a defensive role','יאיר קיבל תפקיד בהגנה'],['and protested','ומחה'],['that he usually scored goals.','שהוא בדרך כלל מבקיע שערים.']],
  [['During the match,','במהלך המשחק,'],['Yair stopped two attacks','יאיר עצר שתי התקפות'],['from that new position.','מן העמדה החדשה.']],
  [['Niv lost the ball,','ניב איבד את הכדור,'],['but Ron won it back','אך רון השיג אותו בחזרה'],['and passed to him','ומסר לו'],['instead of blaming him.','במקום להאשים אותו.']],
  [['The game ended in a draw,','המשחק הסתיים בתיקו,'],['and every student','וכל תלמיד'],['had touched the ball.','נגע בכדור.']],
  [['The class agreed','הכיתה הסכימה'],['that captains would rotate','שהקפטנים יתחלפו'],['and positions would change.','והעמדות ישתנו.']],
  [['The next week,','בשבוע הבא,'],['Ron opened the list and asked,','רון פתח את הרשימה ושאל:'],['“Who has not played in attack?”','״מי עוד לא שיחק בהתקפה?״']]
 ],
 'new-1-a2-screen-time-plan':[
  [['Dana opened her phone','דנה פתחה את הטלפון שלה'],['after finishing homework','לאחר שסיימה את שיעורי הבית'],['and watched one short video.','וצפתה בסרטון קצר אחד.']],
  [['Two hours later,','שעתיים לאחר מכן,'],['she was still awake','היא עדיין הייתה ערה'],['and had missed her evening walk.','והחמיצה את הליכת הערב שלה.']],
  [['The next morning,','למחרת בבוקר,'],['she forgot her sports shoes','היא שכחה את נעלי הספורט'],['and found the first lesson difficult.','והתקשתה בשיעור הראשון.']],
  [['She blamed a busy week,','היא האשימה שבוע עמוס,'],['but the same pattern','אך אותה תבנית'],['happened again on Thursday.','חזרה ביום חמישי.']],
  [['Dana recorded her screen use','דנה תיעדה את זמן המסך שלה'],['for seven days','במשך שבעה ימים'],['and circled the late-night hours.','והקיפה את השעות המאוחרות.']],
  [['Her first plan was strict:','התכנית הראשונה שלה הייתה נוקשה:'],['no phone after school.','בלי טלפון אחרי הלימודים.']],
  [['By Tuesday,','עד יום שלישי,'],['she needed the phone','היא נזקקה לטלפון'],['for a class message','להודעה כיתתית'],['and abandoned the rule.','וזנחה את הכלל.']],
  [['Instead of hiding the failed plan,','במקום להסתיר שהתכנית נכשלה,'],['she showed the record','היא הראתה את הרישום'],['to her older sister.','לאחותה הגדולה.']],
  [['Together they separated','יחד הן הפרידו'],['school tasks, messages, and entertainment','בין מטלות לימוד, הודעות ובידור'],['on the chart.','בטבלה.']],
  [['Dana set a stop time,','דנה קבעה שעת סיום לשימוש,'],['charged the phone in the kitchen,','הטעינה את הטלפון במטבח,'],['and planned three short walks.','ותכננה שלוש הליכות קצרות.']],
  [['On the first night,','בלילה הראשון,'],['she returned for one message','היא חזרה בשביל הודעה אחת'],['but left before opening a video.','אך יצאה לפני שפתחה סרטון.']],
  [['After a week,','כעבור שבוע,'],['she slept longer','היא ישנה יותר'],['and completed her walks,','והשלימה את ההליכות,'],['although her total screen time','אף שזמן המסך הכולל שלה'],['had not disappeared.','לא נעלם.']],
  [['When the next video began automatically,','כאשר הסרטון הבא התחיל אוטומטית,'],['Dana closed it','דנה סגרה אותו'],['and put on her walking shoes.','ונעלה את נעלי ההליכה.']]
 ],
 'new-1-a2-water-bottle-station':[
  [['After the school fair,','לאחר היריד בבית הספר,'],['the recycling bins held','פחי המחזור הכילו'],['hundreds of plastic bottles.','מאות בקבוקי פלסטיק.']],
  [['The student council had one week','למועצת התלמידים היה שבוע אחד'],['to suggest changes','להציע שינויים'],['before the school ordered drinks','לפני שבית הספר יזמין משקאות'],['for the next event.','לאירוע הבא.']],
  [['Noa and Sami counted the bottles','נועה וסמי ספרו את הבקבוקים'],['from one afternoon','מאחר צהריים אחד'],['instead of estimating the waste.','במקום להעריך את כמות הפסולת.']],
  [['They proposed a refill station,','הם הציעו תחנת מילוי,'],['but the principal asked,','אך המנהל שאל:'],['“How many students would use it?”','״כמה תלמידים ישתמשו בה?״']],
  [['The council had no answer,','למועצה לא הייתה תשובה,'],['and the order deadline','ומועד ההזמנה'],['was two days away.','היה בעוד יומיים.']],
  [['With the caretaker’s help,','בעזרת אב הבית,'],['they built a temporary refill point','הם הקימו נקודת מילוי זמנית'],['beside the cafeteria.','ליד חדר האוכל.']],
  [['On the first day,','ביום הראשון,'],['the line blocked the doorway','התור חסם את הפתח'],['and several students left.','וכמה תלמידים עזבו.']],
  [['Noa moved the station','נועה העבירה את התחנה'],['to a wider space,','אל מרחב רחב יותר,'],['and Sami marked two waiting places.','וסמי סימן שני מקומות המתנה.']],
  [['They counted filled bottles','הם ספרו בקבוקים שמולאו'],['during each break','בכל הפסקה'],['and recorded the waiting time.','ותיעדו את זמן ההמתנה.']],
  [['By Friday,','עד יום שישי,'],['students had refilled','תלמידים מילאו מחדש'],['their own bottles','את הבקבוקים שלהם'],['one hundred and twelve times.','מאה ושתים עשרה פעמים.']],
  [['The figures reached the council','הנתונים הגיעו למועצה'],['before the final order.','לפני ההזמנה הסופית.']],
  [['The school ordered fewer bottles','בית הספר הזמין פחות בקבוקים'],['and approved a permanent station.','ואישר תחנה קבועה.']],
  [['The new station still needed cleaning','התחנה החדשה עדיין דרשה ניקוי'],['and a daily check,','ובדיקה יומית,'],['so the council created a schedule.','ולכן המועצה יצרה לוח תורנויות.']],
  [['At the next fair,','ביריד הבא,'],['Sami filled his own bottle','סמי מילא את הבקבוק שלו'],['beside a half-empty recycling bin.','ליד פח מחזור חצי ריק.']]
 ],
'new-1-es-ride-changed-plans':[
  [['Eitan offered Yonatan a ride','Eitan invited Yonatan'],['on his electric scooter','to share his scooter'],['after basketball practice.','after practice.']],
  [['They were already late, and neither had brought a second helmet.','They were late and had only one helmet.']],
  [['Yonatan knew that two riders were unsafe, but the next bus would not arrive for twenty minutes.','Yonatan understood the danger, but waiting for the bus would take a long time.']],
  [['He stepped onto the scooter, and Eitan pushed off before either of them reconsidered.','They made the unsafe choice before stopping to think again.']],
  [['At the first corner, a delivery bicycle appeared from behind a parked van.','A bicycle suddenly appeared from behind a vehicle.']],
  [['Eitan braked sharply; the scooter shook, and Yonatan jumped off without falling.','Eitan stopped fast, the scooter moved, and Yonatan got off safely.']],
  [['The cyclist passed safely, but Eitan’s hands would not stop shaking.','Nobody was hurt, but Eitan was badly shaken.']],
  [['A traffic volunteer nearby explained that an extra rider reduced control and could cause injury or legal penalties.','A nearby safety volunteer explained that a passenger made the scooter harder to control and could cause harm or legal problems.']],
  [['Eitan admitted that being late had seemed more important than safety.','Eitan admitted that he had placed speed before safety.']],
  [['They locked the scooter','They waited'],['and took the bus,','for the bus'],['arriving after the game had begun.','and accepted that they would arrive late.']],
  [['The following week, Eitan refused another passenger before the scooter moved.','Later Eitan said no to the same unsafe choice before the ride began.']]
 ],
'new-1-es-misleading-headline':[
  [['The class group displayed a headline: “All school trips cancelled.”','A dramatic title said that all school trips were cancelled.']],
  [['Mira forwarded it','Mira shared the title'],['before opening the article,','without reading the report,'],['and several students','and other students'],['copied her message.','shared it too.']],
  [['Within minutes,','The false message quickly'],['students stopped preparing,','changed plans'],['and several parents','and worried'],['called the school office.','families.']],
  [['The article itself said only this: officials were reviewing one hiking route for safety.','The full report discussed only one route that officials were checking.']],
  [['Mira noticed the difference when her friend asked which trip the report named.','A friend’s question made Mira compare the title with the report.']],
  [['Her face grew hot when she saw that six people had already forwarded her message.','Mira felt embarrassed when she saw how far her message had spread.']],
  [['Deleting the headline would not reach people who had already copied it.','Removing one message would not correct every copied version.']],
  [['She opened the original source, checked its date and publisher, and wrote a correction.','Mira checked where and when the report was published, then wrote the accurate information.']],
  [['Mira sent the correction','She corrected the mistake'],['to every group','in each place'],['where she had shared the claim.','where she had made it.']],
  [['She also asked classmates to forward the correction as widely as the headline.','Mira asked others to spread the accurate message too.']],
  [['The office still spent the morning answering calls from worried parents.','The correction could not remove all the work and worry already created.']],
  [['A week later, Mira opened the article first when another dramatic headline appeared.','Later Mira read the full source before reacting to another strong title.']]
 ],
'new-1-es-uncredited-idea':[
  [['For the courtyard project,','Leah created the main design'],['Leah designed an interlocking shade model','for a shade model'],['and sketched the joints at home.','in the school courtyard.']],
  [['During the presentation,','The public presentation'],['only the final thank-you slide','did not identify'],['showed Leah’s name.','Leah’s real contribution.']],
  [['Ben described the model','Ben presented Leah’s idea'],['as the group’s central idea','as if it belonged'],['while Leah held the planning notebook.','to the whole group.']],
  [['She almost stayed silent because the judges were already praising the team.','Leah feared that correcting the credit would spoil a successful moment.']],
  [['Then a judge asked,','A judge asked'],['“Why does the model use','about one important detail'],['paired triangles at every joint?”','in the design.']],
  [['Ben turned toward the poster,','Ben could not explain the choice'],['but the answer was not there.','because he had not designed that part.']],
  [['Leah pressed her thumb against the notebook edge and said, “That was my design.”','Leah gathered the courage to identify her own work.']],
  [['She opened the dated sketch','Her earlier notes'],['and explained how paired pieces','proved the source of the idea'],['stopped the structure from folding inward.','and explained how it worked.']],
  [['After thanking Leah, the judge asked the team to describe each person’s work.','The judge made space for the contribution of each student.']],
  [['Ben admitted that he had removed the detailed credits because he wanted a cleaner slide.','Ben accepted that his design choice had hidden Leah’s work.']],
  [['Before the results were announced, he restored Leah’s contribution and showed the planning notes.','Ben corrected the public record before the event ended.']],
  [['The project received praise, but Leah did not accept his apology immediately.','The group succeeded, but trust did not return at once.']],
  [['For the next task,','The students began recording'],['the team kept a shared record','each person’s work'],['from the first meeting.','from the start.']],
  [['Leah led the opening section and introduced the idea herself.','Leah took a visible role that reflected her actual contribution.']]
 ],
'new-1-es-edited-photograph':[
  [['A photograph in the class group','A shared picture'],['seemed to show a wide crack','appeared to show serious damage'],['across the new basketball court.','on the school court.']],
  [['The message claimed that Saturday’s tournament had become unsafe.','The claim made students think that an important event could not continue safely.']],
  [['Students shared the picture, and the team moved practice to a crowded indoor hall.','The image spread and changed the team’s plans.']],
  [['Nora zoomed in and noticed that the crack crossed a painted line without changing its color.','Nora saw that one visual detail did not behave naturally.']],
  [['She also found the same leaf repeated three times beside the crack.','Another repeated detail suggested that part of the picture had been copied.']],
  [['Her first explanation was that the camera had distorted the surface.','At first, Nora considered an ordinary camera problem.']],
  [['She visited the court with the coach and found no crack there.','A direct check showed that the real court was not damaged.']],
  [['The coach wanted to post','Nora wanted evidence'],['a quick denial,','of the change'],['but Nora wanted the original first.','before making another claim.']],
  [['Nora used a reverse image search','An online image search'],['and found the court','found the real damaged court'],['in another city.','somewhere else.']],
  [['Someone had placed that crack','The editor had combined'],['over the school’s recent photograph','parts of two'],['and cropped out the original fence.','different photographs.']],
  [['The editor admitted that he had intended a joke for two friends.','The editor said that the false picture had started as a private joke.']],
  [['By then, the picture had reached parents outside the class group.','The edited image had spread beyond its intended audience.']],
  [['He posted the original images beside the edit and explained each change.','The student showed the sources and clearly corrected the false picture.']],
  [['Practice resumed on the court, but the team had lost one full training session.','The correction restored the plan but could not return the lost time.']],
  [['At the next media club meeting, Nora requested the source file before judging another dramatic image.','Nora later checked the source before trusting another surprising picture.']]
 ],
'new-1-es-feed-never-ended':[
  [['Roni opened a social-media feed during a ten-minute break before revising her science notes.','Roni planned to look at posts briefly before returning to her science work.']],
  [['She turned a small hourglass beside the phone and promised to stop when the sand ran out.','Roni used a timer to make the short break visible.']],
  [['One video led to a comment that opened another post.','Each item on the screen led directly to something new.']],
  [['Each new item appeared immediately, erasing every natural stopping point.','The design gave Roni no clear final item.']],
  [['After the sand ran out, Roni reversed the hourglass and chose one more post.','Roni knowingly extended the break after the first limit ended.']],
  [['Her hand covered an unopened notebook.','Her science work had not begun again.']],
  [['Maya’s study call appeared on the screen.','Roni’s study partner tried to begin their planned call.']],
  [['Roni silenced the call and watched one supposed final clip.','Roni chose the feed over the commitment for one more moment.']],
  [['When Roni finally looked up, fifty minutes had passed; Maya had ended the call.','The short break had become long enough to cost them their shared study time.']],
  [['The comparison table was still blank, though they planned to finish it.','Their unfinished work made the lost time visible.']],
  [['“I waited,” Maya wrote. “Are you coming back?”','Maya made clear that Roni’s choice had affected another person.']],
  [['Roni typed an excuse about difficult homework, then deleted it.','Roni considered hiding the real reason but chose not to send the excuse.']],
  [['“I kept scrolling and missed our time. I am sorry,” she replied.','Roni admitted the choice directly and apologized.']],
  [['The next afternoon, she placed the phone inside a box and kept the hourglass on the desk.','Roni changed her environment instead of depending only on self-control.']],
  [['A notification buzzed; her hand moved toward the box, then stopped beside an unfinished paragraph.','The same temptation returned while Roni still had work to complete.']],
  [['She joined Maya on time with her phone still boxed beside the empty hourglass.','Roni kept the next commitment and did not restart the finished break.']]
 ],
'new-1-es-cost-of-convenience':[
  [['For the winter market, Leah’s committee ordered four hundred disposable cups and plates.','The event team chose many single-use items because they were easy to provide.']],
  [['Every stall welcomed the light stacks and expected a quick cleanup.','The convenient plan seemed helpful before the event began.']],
  [['After the final visitor left, eleven clear bags stood beside the overflowing bins.','The large amount of waste became visible when the market ended.']],
  [['The caretaker lifted one bag: “Convenience moved the work outside.”','The easy choice had created cleanup and disposal work for somebody else.']],
  [['The school’s next event would use washable dishes, Leah promised.','Leah responded with a complete change for the following event.']],
  [['At rehearsal, the cafeteria offered sixty cups for one hundred twenty guests.','The first reusable plan did not provide enough cups for the expected crowd.']],
  [['A washing queue formed at the sink, so volunteers opened a forgotten package of disposable cups.','The first attempt failed when the cleaning system became too slow.']],
  [['A second waste bag filled with new cups; Leah’s confident promise collapsed.','The public failure made Leah question her simple solution.']],
  [['Eitan timed one washing cycle and counted twenty clean cups still sitting on empty tables.','A measurement showed that the problem involved collection as well as washing.']],
  [['The committee borrowed enough dishes and placed return crates beside every exit.','The revised plan made it easier to collect and reuse each item.']],
  [['Three small teams collected, washed, and dried dishes through a repeating loop.','Clear roles turned cleanup into a shared system.']],
  [['No disposable cups stood on the tables when debate night began.','The second attempt started with the changed plan in place.']],
  [['During the break, returning cups overwhelmed the drying team again.','A rush of returns tested the improved system.']],
  [['Noa moved the drying rack beside the return crates and opened a second tray.','One practical adjustment removed the new bottleneck.']],
  [['The line cleared before the next speech began.','The revised process recovered without returning to single-use cups.']],
  [['Cleanup took twenty-five extra minutes; just one small waste bag remained.','The team reduced waste while honestly accepting extra labor.']],
  [['All reusable dishes fit inside one crate; the timing sheet rested on top.','The equipment and the lessons from both attempts were kept for the next event.']]
 ],
'new-2-a1-homework-could-not-explain':[
  [['Yossi used an AI tool','יוסי השתמש בכלי בינה מלאכותית'],['to solve his math homework.','כדי לפתור את שיעורי הבית במתמטיקה.']],
  [['He copied an answer','הוא העתיק תשובה'],['about colored blocks','על קוביות צבעוניות'],['that he did not understand.','שלא הבין.']],
  [['The next day,','למחרת,'],['his teacher placed colored blocks','המורה שלו הניחה קוביות צבעוניות'],['on the table','על השולחן'],['and asked him','וביקשה ממנו'],['to show the rule.','להראות את הכלל.']],
  [['Yossi moved one blue block,','יוסי הזיז קובייה כחולה אחת,'],['then stopped.','ואז נעצר.']],
  [['He looked down and admitted,','הוא הביט מטה והודה:'],['“I copied the answer','״העתקתי את התשובה'],['and cannot explain it.”','ואיני יכול להסביר אותה.״']],
  [['The teacher returned the paper','המורה החזירה את הדף'],['and asked him to rebuild the answer','וביקשה ממנו לבנות מחדש את התשובה'],['after class.','לאחר השיעור.']],
  [['Yossi made three rows','יוסי יצר שלוש שורות'],['of four blocks','של ארבע קוביות'],['and wrote each step himself.','וכתב בעצמו כל צעד.']],
  [['He used the tool','הוא השתמש בכלי'],['to check his explanation,','כדי לבדוק את ההסבר שלו,'],['then changed one unclear line.','ואז שינה שורה אחת לא ברורה.']],
  [['On the next day,','ביום הבא,'],['he explained a new example','הוא הסביר דוגמה חדשה'],['without opening the laptop.','בלי לפתוח את המחשב.']],
  [['His corrected page showed','הדף המתוקן שלו הראה'],['the crossed-out answer','את התשובה המחוקה'],['and his own block drawing.','ואת ציור הקוביות שלו.']]
 ],
'new-2-a1-hospital-visit':[
  [['Eyal stayed in hospital','אייל נשאר בבית החולים'],['after an operation.','לאחר ניתוח.']],
  [['Amir and David arrived','אמיר ודוד הגיעו'],['with a card and a small gift','עם כרטיס ומתנה קטנה'],['for a long visit.','לביקור ארוך.']],
  [['They began telling him','הם התחילו לספר לו'],['a funny story from class.','סיפור מצחיק מהכיתה.']],
  [['Eyal smiled,','אייל חייך,'],['then closed his eyes','ואז עצם את עיניו'],['and held the blanket tightly.','ואחז בחוזקה בשמיכה.']],
  [['Amir began putting the card away','אמיר התחיל להחזיר את הכרטיס לתיק'],['because he thought','כי חשב'],['Eyal did not want them there.','שאייל לא רוצה שהם יהיו שם.']],
  [['A nurse explained','אחות הסבירה'],['that Eyal was tired','שאייל היה עייף'],['because of the medicine,','בגלל התרופה,'],['not angry.','ולא כועס.']],
  [['David asked,','דוד שאל:'],['“Should we stay five minutes','״האם להישאר חמש דקות'],['or come tomorrow?”','או לבוא מחר?״']],
  [['Eyal pointed to the card','אייל הצביע על הכרטיס'],['and asked for three class messages.','וביקש שלוש הודעות מהכיתה.']],
  [['They read only three,','הם קראו רק שלוש,'],['left the card beside his bed,','השאירו את הכרטיס ליד מיטתו,'],['and went home quietly.','והלכו הביתה בשקט.']],
  [['That evening,','באותו ערב,'],['Eyal sent a voice message','אייל שלח הודעה קולית'],['thanking them for the short visit.','והודה להם על הביקור הקצר.']],
  [['On their next visit,','בביקור הבא,'],['Amir held up five fingers','אמיר הרים חמש אצבעות'],['and waited for Eyal to nod.','והמתין שאייל יהנהן.']]
 ],
'new-2-a1-emergency-practice':[
  [['The class practiced the route','הכיתה תרגלה את המסלול'],['to the safe room.','אל המרחב המוגן.']],
  [['Ron folded the map,','רון קיפל את המפה,'],['saying they already knew','ואמר שהם כבר מכירים'],['the route.','את המסלול.']],
  [['Maya saw Lior,','מאיה ראתה את ליאור,'],['a new student,','תלמיד חדש,'],['looking between two doors.','מביט בין שתי דלתות.']],
  [['The teacher paired them','המורה שיבצה אותם יחד'],['and showed Maya the second route.','והראתה למאיה את המסלול השני.']],
  [['Later, the practice alarm sounded','מאוחר יותר נשמעה אזעקת התרגול'],['during a math lesson.','במהלך שיעור מתמטיקה.']],
  [['Two students hurried toward the hall','שני תלמידים מיהרו אל המסדרון'],['until the teacher reminded them','עד שהמורה הזכירה להם'],['to walk.','ללכת.']],
  [['A chair blocked','כיסא חסם'],['part of the main door','חלק מן הדלת הראשית'],['to the safe room.','אל המרחב המוגן.']],
  [['Ron reached for the chair,','רון שלח יד אל הכיסא,'],['but Maya remembered the second route.','אבל מאיה זכרה את המסלול השני.']],
  [['“Stay with me,”','״הישאר איתי,״'],['she told Lior','אמרה לליאור'],['and led the line','והובילה את הטור'],['through the next classroom.','דרך הכיתה הסמוכה.']],
  [['Inside the safe room,','בתוך המרחב המוגן,'],['Ron counted the class','רון ספר את תלמידי הכיתה'],['and found everyone there.','ומצא שכולם היו שם.']],
  [['The practice took one extra minute,','התרגול נמשך דקה נוספת,'],['but nobody ran','אבל איש לא רץ'],['or left a partner.','או עזב בן זוג.']],
  [['The class moved the chair,','הכיתה הזיזה את הכיסא,'],['added a keep-clear sign,','הוסיפה סימן להשאיר את הפתח פנוי,'],['and checked both routes.','ובדקה את שני המסלולים.']],
  [['Before the next practice,','לפני התרגול הבא,'],['Ron opened the route map','רון פתח את מפת המסלול'],['and stood beside Lior.','ועמד לצד ליאור.']]
 ],
'new-2-a1-weekend-volunteer':[
  [['Amir volunteered','אמיר התנדב'],['at a community food center','במרכז מזון קהילתי'],['on Sunday morning.','ביום ראשון בבוקר.']],
  [['He expected to spend the day','הוא ציפה לבלות את היום'],['carrying boxes in the back room.','בנשיאת ארגזים בחדר האחורי.']],
  [['The coordinator asked him','הרכזת ביקשה ממנו'],['to help at the visitor table.','לעזור בשולחן קבלת המבקרים.']],
  [['“I do not know what to say,”','״אני לא יודע מה לומר,״'],['Amir told Rivka.','אמר אמיר לרבקה.']],
  [['Rivka showed him one order card','רבקה הראתה לו כרטיס הזמנה אחד'],['and practiced a respectful greeting.','ותרגלה איתו ברכה מכבדת.']],
  [['An older visitor arrived','מבקרת מבוגרת הגיעה'],['and asked for her food box.','וביקשה את ארגז המזון שלה.']],
  [['Amir lifted the standard box,','אמיר הרים את הארגז הרגיל,'],['but she said','אבל היא אמרה'],['the box was too heavy','שהארגז כבד מדי'],['for her stairs.','למדרגות שלה.']],
  [['The line grew longer,','התור התארך,'],['and Amir looked for Rivka.','ואמיר חיפש את רבקה.']],
  [['While carrying two crates,','בזמן שנשאה שני ארגזים,'],['Rivka said,','רבקה אמרה:'],['“Ask what would help.”','״שאל מה יעזור.״']],
  [['“Would two small bags be easier?”','״האם שתי שקיות קטנות יהיו קלות יותר?״'],['Amir asked the visitor.','שאל אמיר את המבקרת.']],
  [['She nodded and chose','היא הנהנה ובחרה'],['which items went in each bag.','אילו פריטים ייכנסו לכל שקית.']],
  [['Rivka carried the next crate','רבקה נשאה את הארגז הבא'],['while Amir explained the new plan','בזמן שאמיר הסביר את התכנית החדשה'],['to another volunteer.','למתנדבת נוספת.']],
  [['The visitor thanked Amir by name,','המבקרת הודתה לאמיר בשמו,'],['and he no longer hid','והוא כבר לא הסתתר'],['behind the boxes.','מאחורי הארגזים.']],
  [['The next Sunday,','ביום ראשון הבא,'],['Amir began at the welcome table:','אמיר התחיל בשולחן קבלת המבקרים:'],['“One box or two bags?”','״ארגז אחד או שתי שקיות?״']]
 ],
'new-2-a1-missed-practice-screen':[
  [['Gil packed his football bag','גיל ארז את תיק הכדורגל שלו'],['before watching game clips','לפני שצפה בסרטוני משחק'],['in bed.','במיטה.']],
  [['After midnight,','לאחר חצות,'],['another clip started automatically.','סרטון נוסף התחיל באופן אוטומטי.']],
  [['Gil moved the phone closer','גיל קירב את הטלפון'],['and silenced his sleep reminder.','והשתיק את תזכורת השינה.']],
  [['His morning alarm rang,','השעון המעורר צלצל בבוקר,'],['but he turned it off','אבל הוא כיבה אותו'],['without waking fully.','בלי להתעורר לגמרי.']],
  [['Sunlight filled the room','אור השמש מילא את החדר'],['when the coach called.','כאשר המאמן התקשר.']],
  [['The team had practiced','הקבוצה התאמנה'],['without its goalkeeper,','בלי השוער שלה,'],['and Niv had waited for him.','וניב המתין לו.']],
  [['Gil began to blame the alarm,','גיל התחיל להאשים את השעון המעורר,'],['then saw on the screen','ואז ראה על המסך'],['that he had stopped it.','שהוא עצמו עצר אותו.']],
  [['He wrote to the team,','הוא כתב לקבוצה:'],['“I silenced the alarm,','״השתקתי את השעון המעורר,'],['and I am sorry.”','ואני מצטער.״']],
  [['The coach said','המאמן אמר'],['they could not repeat','שהם לא יוכלו לחזור'],['the goalkeeper drill that day,','על תרגול השוער באותו יום,'],['but they could prepare','אבל הם יוכלו להתכונן'],['for the next practice.','לאימון הבא.']],
  [['Gil offered to arrive early','גיל הציע להגיע מוקדם'],['and set up the goal','ולהכין את השער'],['at the next practice.','באימון הבא.']],
  [['That evening,','באותו ערב,'],['the next clip began automatically','הסרטון הבא התחיל אוטומטית'],['after his favorite goal.','לאחר השער האהוב עליו.']],
  [['Gil turned off autoplay','גיל כיבה את ההפעלה האוטומטית'],['and put the phone','והכניס את הטלפון'],['in a box across the room.','לקופסה בצד השני של החדר.']],
  [['He set the alarm','הוא כיוון את השעון המעורר'],['beside the packed football bag.','ליד תיק הכדורגל הארוז.']],
  [['The next morning,','למחרת בבוקר,'],['he arrived fifteen minutes early','הוא הגיע רבע שעה מוקדם'],['and set up the goal with Niv.','והכין את השער עם ניב.']],
  [['After practice,','לאחר האימון,'],['Gil watched the saved clip','גיל צפה בסרטון ששמר'],['and closed it when the timer rang.','וסגר אותו כשהטיימר צלצל.']]
 ],
'new-2-a1-shared-computer':[
  [['The media club had','למועדון המדיה היה'],['only one working computer.','מחשב תקין אחד בלבד.']],
  [['Oren played a game','אורן שיחק במשחק'],['while three classmates waited.','בזמן ששלושה חברים לכיתה המתינו.']],
  [['Talia needed a notice by four;','טליה נזקקה למודעה עד ארבע;'],['Ben had homework due at five,','בן נדרש להגיש שיעורי בית בחמש,'],['while Maya’s audio could wait','בעוד שהשמע של מאיה יכול היה להמתין'],['until next week.','עד השבוע הבא.']],
  [['“I was here first,”','״אני הייתי כאן ראשון,״'],['Oren said,','אמר אורן,'],['holding the controller.','כשהוא אוחז בבקר המשחק.']],
  [['Talia wrote the three deadlines','טליה כתבה את שלושת מועדי ההגשה'],['on colored sticky notes.','על פתקים צבעוניים.']],
  [['Oren looked at the notes','אורן הביט בפתקים'],['and closed the game window.','וסגר את חלון המשחק.']],
  [['“Then I never get a turn,”','״אז אף פעם לא יהיה לי תור,״'],['he said quietly.','אמר בשקט.']],
  [['They divided the hour','הם חילקו את השעה'],['by the nearest deadlines','לפי מועדי ההגשה הקרובים'],['and saved ten minutes for Oren.','ושמרו עשר דקות לאורן.']],
  [['Talia’s poster opened','הכרזה של טליה נפתחה'],['with its layout broken.','כשהעימוד שלה השתבש.']],
  [['Oren restored the layout','אורן שיחזר את העימוד'],['and exported the poster','וייצא את הכרזה'],['without losing the design.','בלי לאבד את העיצוב.']],
  [['Ben’s upload was slow,','ההעלאה של בן הייתה איטית,'],['so Maya gave him','ולכן מאיה נתנה לו'],['five minutes from her later slot.','חמש דקות מן התור המאוחר שלה.']],
  [['The notice printed,','המודעה הודפסה,'],['and the homework upload finished.','והעלאת שיעורי הבית הסתיימה.']],
  [['Oren played for ten minutes','אורן שיחק במשך עשר דקות'],['before the timer sounded.','לפני שהטיימר צלצל.']],
  [['He closed the game','הוא סגר את המשחק'],['without being asked.','בלי שהתבקש.']],
  [['The sticky notes stayed','הפתקים נשארו'],['beside the screen','לצד המסך'],['with names and times.','עם שמות ושעות.']],
  [['At the next club meeting,','במפגש הבא של המועדון,'],['Oren asked,','אורן שאל:'],['“Whose deadline is first?”','״של מי מועד ההגשה הראשון?״']]
 ],
'new-2-a2-perfect-project':[
  [['An AI tool produced','כלי בינה מלאכותית יצר'],['the group’s polished project','את הפרויקט המלוטש של הקבוצה'],['about strong shapes overnight.','על צורות חזקות בן לילה.']],
  [['A triangular paper bridge','גשר נייר משולש'],['held twice as much','נשא משקל כפול'],['as a rectangular one,','מגשר מלבני,'],['according to the tool.','לפי הכלי.']],
  [['Noam added the bright graph,','נועם הוסיף את הגרף הצבעוני,'],['but its source link','אבל הקישור למקור שלו'],['opened an empty page.','פתח דף ריק.']],
  [['During rehearsal,','במהלך החזרה,'],['Liat asked','ליאת שאלה'],['where the numbers came from,','מהיכן הגיעו המספרים,'],['but nobody could answer.','אבל איש לא ידע לענות.']],
  [['The deadline was the next morning,','מועד ההגשה היה למחרת בבוקר,'],['and the perfect poster','והכרזה המושלמת'],['was already finished.','כבר הייתה מוכנה.']],
  [['Yael built both bridges','יעל בנתה את שני הגשרים'],['from the same paper','מאותו נייר'],['and tested them with blocks.','ובדקה אותם בעזרת קוביות.']],
  [['The triangular bridge bent','הגשר המשולש התעקם'],['at one weak joint,','בחיבור חלש אחד,'],['while the rectangular bridge still held.','בזמן שהגשר המלבני עדיין החזיק מעמד.']],
  [['Material and joints mattered too,','גם החומר והחיבורים היו חשובים,'],['so the group deleted the false graph.','ולכן הקבוצה מחקה את הגרף הכוזב.']],
  [['They tested three models,','הם בדקו שלושה דגמים,'],['recorded every load,','תיעדו כל משקל,'],['and wrote the limits.','וכתבו את מגבלות הבדיקה.']],
  [['At the presentation,','בהצגה,'],['they showed the bent model','הם הראו את הדגם שהתעקם'],['and explained the missing source.','והסבירו על המקור החסר.']],
  [['The simpler poster stood','הכרזה הפשוטה יותר עמדה'],['beside the creased bridges,','לצד הגשרים המקומטים,'],['and every student could answer questions.','וכל תלמיד הצליח לענות על שאלות.']]
 ],
'new-2-a2-missing-permission':[
  [['The media team published','צוות המדיה פרסם'],['a video from the school fair.','סרטון מן היריד בבית הספר.']],
  [['Dana appeared clearly in the background,','דנה הופיעה בבירור ברקע,'],['although she had asked','אף שביקשה'],['not to appear online.','לא להופיע ברשת.']],
  [['She saw the post and said,','היא ראתה את הפרסום ואמרה:'],['“Please take this down.”','״בבקשה הסירו את זה.״']],
  [['Eyal pointed to the contest deadline','אייל הצביע על מועד ההגשה לתחרות'],['and suggested cropping the clip later.','והציע לחתוך את הקטע מאוחר יותר.']],
  [['Three classmates had already shared it,','שלושה חברים לכיתה כבר שיתפו אותו,'],['and every extra minute','וכל דקה נוספת'],['could spread it farther.','עלולה הייתה להפיץ אותו יותר.']],
  [['Eyal deleted the public post','אייל מחק את הפרסום הפומבי'],['and explained the removal','והסביר את ההסרה'],['to the team.','לצוות.']],
  [['They asked the classmates','הם ביקשו מחברי הכיתה'],['to remove their copies,','להסיר את העותקים שלהם,'],['but one copy had spread','אבל עותק אחד כבר הופץ'],['outside their group.','מחוץ לקבוצה שלהם.']],
  [['The team told the organizer','הצוות הודיע למארגן'],['that permission was missing','שהאישור חסר'],['and missed the deadline','והחמיץ את המועד'],['for a featured slot.','למקום מרכזי בתחרות.']],
  [['Dana did not explain her reason,','דנה לא הסבירה את הסיבה שלה,'],['and nobody asked her to.','ואיש לא ביקש ממנה להסביר.']],
  [['They made a shorter video','הם יצרו סרטון קצר יותר'],['using only clips','והשתמשו רק בקטעים'],['with confirmed permission.','שקיבלו אישור ברור.']],
  [['Before the next edit,','לפני העריכה הבאה,'],['every clip was matched','כל קטע הותאם'],['to the permission list.','לרשימת האישורים.']],
  [['At the next event,','באירוע הבא,'],['Eyal lowered the phone','אייל הוריד את הטלפון'],['when another student raised a hand','כאשר תלמידה אחרת הרימה יד'],['to signal no.','כדי לסמן שאינה מסכימה להצטלם.']]
 ]
};
const narrativeMetadata={
 'new-1-a2-one-scooter-two-friends':{
  arcEn:'Small courage',arcHe:'אומץ קטן',
  lesson:'לחץ חברתי ואיחור אינם הופכים רכיבה משותפת על קורקינט לבטוחה. אומץ קטן לומר לא, לקבל את מחיר האיחור ולבחור בתחבורה אחרת מגן על שני החברים.',
  lessonEn:'Social pressure and lateness do not make sharing one scooter safe. The small courage to refuse, accept being late, and choose different transport protects both friends.'
 },
 'new-1-a2-unequal-group':{
  arcEn:'Shared task, changed relationship',arcHe:'משימה משותפת שמשנה יחסים',
  lesson:'הכרה שווה אינה הוגנת כאשר העבודה לא התחלקה. הודאה גלויה, חלוקת משימות שאפשר לבדוק ומתן מקום למי שנשא בעומס מאפשרים לתקן את התהליך ולא רק את הדגם.',
  lessonEn:'Equal credit is not fair when the work was unequal. Open admission, visible task sharing, and room for the person who carried the load repair the process rather than only the model.'
 },
 'new-1-a2-new-bus-route':{
  arcEn:'Discovery',arcHe:'גילוי בעקבות תצפית',
  lesson:'מסלול מהיר יותר אינו בהכרח טוב יותר לכל הנוסעים. תצפית, מדידת זמנים והקשבה למי שנפגע מן השינוי מאפשרות להציג גם את התועלת וגם את המחיר ולבחון פתרון מעשי.',
  lessonEn:'A faster route is not necessarily better for every passenger. Observation, timing, and listening to affected riders reveal both benefit and cost and support a practical trial.'
 },
 'new-1-a2-unfair-team-choice':{
  arcEn:'Role reversal',arcHe:'היפוך תפקידים',
  lesson:'בחירת קבוצות לפי חברוּת קבועה משאירה יכולות ותלמידים מחוץ למשחק. החלפת תפקידים, שאלת היכולות וסבב קפטנים יכולים ליצור משחק הוגן בלי להפוך את התיקון לנקמה.',
  lessonEn:'Choosing teams through fixed friendships leaves both students and abilities outside the game. Rotating leadership, asking about skills, and changing positions can create fairness without turning repair into revenge.'
 },
 'new-1-a2-screen-time-plan':{
  arcEn:'Second attempt',arcHe:'כישלון וניסיון שני',
  lesson:'תיעוד אמיתי חושף כיצד זמן מסך משפיע על שינה, תנועה וריכוז. כלל קיצוני שנכשל אינו סוף התהליך; הפרדה בין צרכים לשעשוע, שינוי הסביבה וניסיון נוסף יוצרים איזון מעשי יותר.',
  lessonEn:'Honest tracking reveals how screen use affects sleep, movement, and concentration. A failed extreme rule is not the end; separating needs from entertainment, changing the environment, and trying again create a more workable balance.'
 },
 'new-1-a2-water-bottle-station':{
  arcEn:'Preparation pays off',arcHe:'הכנה מוקדמת מוכיחה את עצמה',
  lesson:'רעיון סביבתי נעשה משכנע כאשר מודדים את הבעיה, בודקים פתרון זמני ומשפרים אותו לפני ההחלטה. גם תחנה קבועה דורשת ניקוי, בדיקה וחלוקת אחריות כדי להמשיך להפחית פסולת.',
  lessonEn:'An environmental idea becomes convincing when students measure the problem, test a temporary solution, and improve it before a decision. A permanent station still requires cleaning, checking, and shared responsibility.'
 },
 'new-1-es-ride-changed-plans':{
  arcEn:'Temptation and consequence',arcHe:'פיתוי ותוצאה',
  lesson:'איחור ונוחות עלולים להפוך קיצור דרך מסוכן למפתה. עצירה לאחר כמעט־תאונה, קבלת המחיר של הגעה מאוחרת וסירוב חוזר בפעם הבאה מראים ששינוי אמיתי מתרחש לפני שהקורקינט מתחיל לנוע.',
  lessonEn:'Lateness and convenience can make an unsafe shortcut tempting. Stopping after a near collision, accepting the cost of arriving late, and refusing the same choice next time show change before the scooter moves.'
 },
 'new-1-es-misleading-headline':{
  arcEn:'Chain reaction',arcHe:'תגובת שרשרת',
  lesson:'כותרת דרמטית יכולה ליצור שרשרת של שיתופים, דאגה ועבודה מיותרת לפני שמישהו קורא את המקור. תיקון אחראי חוזר לכל מקום שבו הופצה הטעות, אך אינו מוחק מיד את תוצאותיה.',
  lessonEn:'A dramatic headline can trigger a chain of sharing, worry, and unnecessary work before anyone reads the source. Responsible correction returns to every place where the error spread, but it cannot erase every consequence.'
 },
 'new-1-es-uncredited-idea':{
  arcEn:'Small courage',arcHe:'אומץ קטן',
  lesson:'הכרה הוגנת אינה קישוט בשקופית אלא ייחוס ברור של הרעיון והעבודה. משפט אמיץ, ראיות מתהליך התכנון ותיקון פומבי יכולים להשיב את הקרדיט, אף שהאמון נבנה מחדש לאט יותר.',
  lessonEn:'Fair recognition is not decoration on a slide; it clearly identifies the source of an idea and the work behind it. One courageous sentence, planning evidence, and a public correction can restore credit even while trust returns more slowly.'
 },
 'new-1-es-edited-photograph':{
  arcEn:'False appearance',arcHe:'מראית עין מטעה',
  lesson:'תצלום משכנע עדיין דורש בדיקת פרטים, ביקור במציאות ואיתור קובץ המקור. תיקון אמין מציג את המקורות ואת השינויים באותה בהירות שבה הופץ הדימוי המטעה ומכיר בזמן שכבר אבד.',
  lessonEn:'A convincing photograph still requires attention to visual clues, a check of the real place, and the original source file. A credible correction shows the sources and edits as clearly as the false image and acknowledges the time already lost.'
 },
 'new-1-es-feed-never-ended':{
  arcEn:'Temptation and consequence',arcHe:'פיתוי ותוצאה',
  lesson:'עיצוב שאין בו נקודת עצירה ברורה מקשה להבחין בזמן שחולף, אך אינו מבטל אחריות להתחייבות. הודאה בלי תירוץ ושינוי הסביבה עוזרים להחזיר שליטה לפני הפיתוי הבא.',
  lessonEn:'A design without a natural stopping point can hide passing time, but it does not remove responsibility for a commitment. Honest admission and a changed environment help restore control before the next temptation.'
 },
 'new-1-es-cost-of-convenience':{
  arcEn:'Second attempt',arcHe:'כישלון וניסיון שני',
  lesson:'נוחות חד־פעמית עשויה להעביר את המחיר לניקיון, לפסולת ולאנשים אחרים. ניסיון חוזר המבוסס על מדידה, איסוף וחלוקת תפקידים יכול להפחית פסולת בלי להסתיר את העבודה הנוספת.',
  lessonEn:'Single-use convenience can shift its cost to cleanup, waste, and other people. A measured second attempt with collection points and shared roles can reduce waste without hiding the additional labor.'
 },
 'new-2-a1-homework-could-not-explain':{
  arcEn:'Mistake and repair',arcHe:'טעות ותיקון',
  lesson:'תשובה נכונה אינה למידה כאשר התלמיד אינו יכול להסביר אותה. הודאה, בנייה מחדש של הפתרון ושימוש בכלי רק לבדיקת עבודה עצמאית הופכים טעות לתהליך למידה.',
  lessonEn:'A correct answer is not learning when the student cannot explain it. Admission, rebuilding the solution, and using a tool only to check independent work turn a mistake into learning.'
 },
 'new-2-a1-hospital-visit':{
  arcEn:'Misunderstanding',arcHe:'אי־הבנה שמתבהרת',
  lesson:'עייפות או שתיקה אינן בהכרח דחייה. שאלה קצרה שנותנת בחירה מאפשרת לתמוך בחבר שמחלים בלי להעמיס עליו ובלי לפרש במקומו את צרכיו.',
  lessonEn:'Tiredness or silence does not necessarily mean rejection. A short question that offers a choice supports a recovering friend without creating pressure or deciding that person’s needs for them.'
 },
 'new-2-a1-emergency-practice':{
  arcEn:'Preparation pays off',arcHe:'הכנה מוקדמת מוכיחה את עצמה',
  lesson:'תרגול בטיחות כולל גם מסלול חלופי, הליכה רגועה ושמירה על בן זוג. לאחר התרגול מתקנים חסימה ובודקים שוב, במקום להסתפק בכך שכולם הגיעו.',
  lessonEn:'Safety practice includes a backup route, calm movement, and staying with a partner. After a drill, remove the obstacle and check again rather than stopping when everyone has arrived.'
 },
 'new-2-a1-weekend-volunteer':{
  arcEn:'Role reversal',arcHe:'היפוך תפקידים',
  lesson:'עזרה מכבדת אינה מניחה שכל אדם זקוק לאותו ארגז. שאלה פשוטה, הקשבה והתאמת האריזה לצורך מאפשרות גם למתנדב חדש לעבור מתפקיד צדדי לאחריות אמיתית.',
  lessonEn:'Respectful help does not assume that every person needs the same box. A simple question, careful listening, and adapted packing allow even a new volunteer to take real responsibility.'
 },
 'new-2-a1-missed-practice-screen':{
  arcEn:'Chain reaction',arcHe:'תגובת שרשרת',
  lesson:'סרטון נוסף בלילה עלול להוביל לכיבוי השעון, לאיחור ולהשפעה על קבוצה שלמה. אחריות כוללת הודאה, תיקון מעשי ושינוי שגרת הערב לפני האימון הבא.',
  lessonEn:'One more late-night clip can lead to a silenced alarm, a missed practice, and consequences for a whole team. Responsibility includes admission, practical repair, and a changed evening routine.'
 },
 'new-2-a1-shared-computer':{
  arcEn:'Shared task, changed relationship',arcHe:'משימה משותפת שמשנה יחסים',
  lesson:'משאב מוגבל נעשה הוגן כאשר בודקים מועדי הגשה, שומרים גם זמן לפנאי ומאפשרים גמישות בעת תקלה. מי שמוותר על תור דחוף יכול עדיין לתרום בידע ולקבל תור ברור בהמשך.',
  lessonEn:'A limited resource becomes fairer when deadlines, leisure time, and unexpected delays are all visible. A student who yields an urgent turn can still contribute useful knowledge and receive a clear later turn.'
 },
 'new-2-a2-perfect-project':{
  arcEn:'Search for an explanation',arcHe:'חיפוש אחר הסבר',
  lesson:'מראה מלוטש אינו מחליף מקור שאפשר לבדוק או ניסוי שהקבוצה מבינה. כאשר טענה קורסת, בדיקה הוגנת, תיעוד מגבלות והצגת הכשל עצמו יוצרים פרויקט אמין יותר.',
  lessonEn:'A polished appearance cannot replace a verifiable source or a test the group understands. When a claim fails, fair testing, recorded limits, and open presentation of the failure create more credible work.'
 },
 'new-2-a2-missing-permission':{
  arcEn:'Mistake and repair',arcHe:'טעות ותיקון',
  lesson:'הסכמה אינה פרט שמתקנים רק לאחר הפרסום, ואדם אינו חייב להסביר מדוע סירב להופיע. הסרה מיידית, הודאה במחיר ורשימת אישורים לפני העריכה מתחילות תיקון שאינו יכול להשיב עותק שכבר הופץ.',
  lessonEn:'Consent is not a detail to repair only after publication, and a person does not owe a reason for refusing to appear. Immediate removal, acceptance of the cost, and a permission list before editing begin a repair that cannot retrieve every shared copy.'
 },
 'l2-a2-rumor':{
  arcEn:'False appearance',arcHe:'מראית עין מטעה',
  lesson:'צילום מסך חלקי עלול להפוך פרט נכון לשמועה מטעה. בדיקת המקור, הצגת ההקשר המלא ותיקון באותו מקום הם חלק מן האחריות של מי שכמעט שיתף.',
  lessonEn:'A partial screenshot can turn one true detail into a misleading rumor. Checking the source, restoring the full context, and correcting the claim in the same place are part of responsible sharing.'
 },
 'l2-a2-community-race':{
  arcEn:'Unexpected ability',arcHe:'יכולת מפתיעה',
  lesson:'נגישות מתחילה בשלב התכנון ובשיתוף האנשים שישתמשו במסלול. מסלולים ותפקידים שונים יכולים לשמור על אתגר משותף בלי להשאיר משתתף מחוץ לאירוע.',
  lessonEn:'Access begins during planning and with the voices of people who will use the route. Different routes and active roles can preserve a shared challenge without leaving participants outside the event.'
 },
 'l2-es-online-challenge':{
  arcEn:'Chain reaction',arcHe:'תגובת שרשרת',
  lesson:'סרטון קצר עשוי להסתיר את הסיכון ואת התוצאה שקדמו לו. סירוב לצלם או לשתף יכול לעצור חיקוי ולשנות גם את שיקול הדעת של החברים.',
  lessonEn:'A short video may hide both the danger and the earlier consequence. Refusing to record or share it can interrupt imitation and help friends question what the camera leaves out.'
 },
 'l2-es-accessible-trip':{
  arcEn:'Role reversal',arcHe:'היפוך תפקידים',
  lesson:'נגישות אינה טובה שעושים למישהו ואינה ויתור על אתגר. פתרון שמסתמך על נשיאה מסוכנת אינו השתתפות אמיתית; תכנון בהובלת מי שמכיר את המכשול יכול להרחיב השתתפות ולשפר את בטיחות הקבוצה כולה.',
  lessonEn:'Accessibility is neither a dangerous favor nor the removal of challenge. When the person who knows the barrier helps lead the planning, an adaptation can expand participation and improve safety for the whole group.'
 },
 'l2-es-energy-audit':{
  arcEn:'Discovery',arcHe:'גילוי בעקבות רמזים',
  lesson:'מדידה והשוואה מאפשרות למצוא בזבוז בלי להאשים אדם מראש. שינוי במערכת חשמלית מבצעים אנשי מקצוע, ותוצאה אמינה דורשת בדיקה חוזרת לאחר השינוי.',
  lessonEn:'Measurement and comparison can reveal waste without blaming a person in advance. Qualified workers should change electrical systems, and reliable improvement must be checked again after the change.'
 },
 'l3-a1-first-aid':{
  arcEn:'Preparation pays off',arcHe:'הכנה מוקדמת מוכיחה את עצמה',
  lesson:'תרגול מוקדם עוזר לפעול ברוגע כאשר אדם זקוק לעזרה. פינוי מקום, הזעקת שירותי חירום, חלוקת תפקידים והישמעות למוקדן עדיפים על פעולה רפואית מאולתרת.',
  lessonEn:'Practice supports calm action when someone needs help. Making space, calling emergency services, sharing clear roles, and following the operator are safer than improvising medical treatment.'
 },
 'l3-a1-community-library':{
  arcEn:'Second attempt',arcHe:'כישלון וניסיון שני',
  lesson:'ניסיון ראשון דל אינו מוכיח שאין צורך בשירות. הקשבה לשעות ולצרכים של הקהילה, מדידה הוגנת והתמדה הופכות רעיון חד־פעמי לתכנית שאפשר לבחון לאורך זמן.',
  lessonEn:'A poorly attended first attempt does not prove that a service is unnecessary. Listening to community schedules and needs, measuring fairly, and continuing the work can turn one event into a plan worth testing.'
 },
 'l3-a1-water-shortage':{
  arcEn:'Moral dilemma',arcHe:'דילמה בין ערכים',
  lesson:'הוגנות בזמן מחסור אינה חלוקה שווה של כל קיצוץ. יש לתקן בזבוז, להגן על צרכים חיוניים ולקבל ביושר גם מחיר נראה לעין עבור סדר עדיפויות אחראי.',
  lessonEn:'Fairness during a shortage does not mean cutting every use equally. Repair waste, protect essential needs, and honestly accept the visible cost of responsible priorities.'
 },
 'l3-a2-ai-homework':{
  arcEn:'Mistake and repair',arcHe:'טעות ותיקון',
  lesson:'כלי דיגיטלי יכול לתמוך בכתיבה אך אינו מחליף הבנה או בעלות על העבודה. תיקון אמיתי כולל הודאה, תוצאה, גילוי של העזרה שהתקבלה ויכולת להסביר כל רעיון שהוגש.',
  lessonEn:'A digital tool can support writing but cannot replace understanding or authorship. Honest repair includes admission, a real consequence, disclosure of the help used, and the ability to explain every submitted idea.'
 },
 'l3-a2-witness':{
  arcEn:'Small courage',arcHe:'אומץ קטן',
  lesson:'שתיקה מול השפלה חוזרת מגינה על הפגיעה, לא על החברות. רישום מדויק, הקשבה לאדם שנפגע ופנייה משותפת למבוגר אחראי מאפשרים להתחיל בירור הוגן גם כשהמחיר החברתי נשאר.',
  lessonEn:'Silence during repeated humiliation protects the harm rather than the friendship. Accurate facts, listening to the affected person, and approaching a responsible adult together can begin a fair review even when a social cost remains.'
 },
 'l1-a1-new-student':{
  arcEn:'Help from a friend',arcHe:'קבלת עזרה מחבר',
  lesson:'הזמנה קטנה יכולה לפתוח דלת לשייכות. קבלת פנים אמיתית ניכרת כאשר מי שקיבל מקום מפנה מקום לאחר.',
  lessonEn:'A small invitation can open the door to belonging. A welcome becomes meaningful when the person who received it later makes room for someone else.'
 },
 'l1-a1-lost-dog':{
  arcEn:'Rescue or intervention',arcHe:'חילוץ והתערבות אחראית',
  lesson:'חמלה כלפי בעל חיים צריכה לבוא יחד עם שמירה על בטיחות, פנייה למבוגר וחלוקת אחריות.',
  lessonEn:'Caring for an animal should be combined with personal safety, adult help, and a clear division of responsibility.'
 },
 'l1-a1-back-to-school':{
  arcEn:'Role reversal',arcHe:'היפוך תפקידים',
  lesson:'כל אדם יכול לעיתים לעזור ולעיתים להזדקק לעזרה. עזרה מכבדת שומרת על עצמאות האדם ומתאימה את עצמה לקצב שלו.',
  lessonEn:'Anyone may sometimes help and sometimes need help. Respectful support preserves independence and follows the pace of the person receiving it.'
 },
 'l1-a2-no-phone':{
  arcEn:'Discovery through experience',arcHe:'גילוי באמצעות התנסות',
  lesson:'שימוש מאוזן בטלפון מאפשר לשמור על קשר דיגיטלי בלי לאבד שיחה, הקשבה ונוכחות.',
  lessonEn:'Balanced phone use can preserve digital connection without replacing conversation, listening, and attention to the people nearby.'
 },
 'l1-a2-last-runner':{
  arcEn:'Second attempt',arcHe:'כישלון וניסיון שני',
  lesson:'התקדמות נמדדת לא רק במקום מול אחרים אלא גם בשיפור אישי. עידוד והתמדה הופכים מאמץ להישג.',
  lessonEn:'Progress is measured not only by rank but also by personal improvement. Encouragement and persistence can turn effort into achievement.'
 },
 'l1-a2-clean-playground':{
  arcEn:'Preparation pays off',arcHe:'הכנה מוקדמת מוכיחה את עצמה',
  lesson:'אחריות סביבתית אינה מסתיימת בניקיון חד־פעמי. מדידה, מיון ושינוי ההכנות לאירוע הבא מונעים מן הפסולת לחזור.',
  lessonEn:'Environmental responsibility does not end with a single cleanup. Measuring the waste and changing the next event’s preparation help prevent the problem from returning.'
 },
 'l1-es-wrong-message':{
  arcEn:'Mistake and repair',arcHe:'טעות ותיקון',
  lesson:'מחיקה אינה מבטלת את הפגיעה שנגרמה מהודעה מקוונת. הודאה ישירה, התנצלות ללא דרישה לסליחה ושינוי בהתנהגות מתחילים את התיקון.',
  lessonEn:'Deleting an online message does not erase its effect. Direct admission, an apology that does not demand forgiveness, and changed behavior begin the repair.'
 },
 'l1-es-appearance':{
  arcEn:'Unexpected ability',arcHe:'יכולת מפתיעה',
  lesson:'מראה חיצוני ושקט אינם מדד ליכולת. חלוקת תפקידים הוגנת מתחילה בשאלה ובהקשבה, לא בהנחה מוקדמת.',
  lessonEn:'Appearance and quietness are not measures of ability. Fair roles begin with asking and listening rather than making assumptions.'
 },
 'l1-es-school-garden':{
  arcEn:'Shared task, changed relationship',arcHe:'משימה משותפת שמשנה יחסים',
  lesson:'תכנון סביבתי טוב מחבר בין יצירתיות, מדידה והתאמה לתנאים. שיתוף פעולה אינו מחייב לבחור בין יופי לחיסכון כאשר אפשר לתכנן את שניהם יחד.',
  lessonEn:'Sound environmental design combines creativity, measurement, and adaptation. Cooperation can protect both beauty and limited resources instead of treating them as opposites.'
 },
 'l2-a1-wallet':{
  arcEn:'Moral dilemma',arcHe:'דילמה בין ערכים',
  lesson:'יושר עשוי לדרוש ויתור ממשי, כמו החמצת אוטובוס. פנייה למבוגר אחראי מגינה על המציאה ועל מי שמצא אותה.',
  lessonEn:'Honesty may require a real sacrifice, such as missing a bus. Turning to a responsible adult protects both the lost property and the person who found it.'
 },
 'l2-a1-helping-neighbor':{
  arcEn:'Help from a friend',arcHe:'קבלת עזרה מחבר',
  lesson:'עזרה מכבדת מתחילה בשאלה ואינה לוקחת שליטה. כאשר כל אדם יכול גם לקבל וגם לתרום, העזרה הופכת לקשר הדדי ולא ליחס של תלות.',
  lessonEn:'Respectful help begins with asking rather than taking control. When everyone can both receive and contribute, support becomes a mutual relationship rather than dependence.'
 },
 'l2-a1-team-place':{
  arcEn:'Unexpected ability',arcHe:'יכולת מפתיעה',
  lesson:'קבוצה מתחזקת כאשר היא מזהה סוגים שונים של יכולת. שחקן שקט או אטי יותר עשוי לראות מה שאחרים מחמיצים.',
  lessonEn:'A team becomes stronger when it recognizes different forms of ability. A quieter or slower player may notice what others miss.'
 },
 'l2-a2-photo-spread':{
  arcEn:'False appearance',arcHe:'מראית עין מטעה',
  lesson:'תמונה חתוכה עלולה ליצור סיפור שקרי ולפגוע גם לאחר שמתקנים אותו. יש לבדוק את המקור, לפרסם תיקון באותו מקום ולבקש רשות לפני שיתוף תמונה של אדם אחר.',
  lessonEn:'A cropped image can create a false story and continue causing harm after a correction. Check the source, correct the claim in the same place, and ask permission before sharing another person’s image.'
 },
 'l2-a2-cheating':{
  arcEn:'Mistake and repair',arcHe:'טעות ותיקון',
  lesson:'נאמנות לחבר אינה מחייבת לשקר למענו. אמת, תוצאה ממשית והצעה לעזרה ישרה מאפשרות להתחיל לתקן את הפגיעה באמון.',
  lessonEn:'Loyalty to a friend does not require lying for that friend. Truth, a real consequence, and an offer of honest help can begin to repair trust.'
 },
 'l2-a2-injured-captain':{
  arcEn:'Role reversal',arcHe:'היפוך תפקידים',
  lesson:'גם מי שמוביל אחרים זקוק לעיתים לעזרה ולתחושת שייכות. חלוקת תפקידים גמישה מאפשרת לאדם להמשיך לתרום בלי להסתיר את צרכיו.',
  lessonEn:'Even a person who usually leads may need help and reassurance of belonging. Flexible roles allow someone to keep contributing without hiding personal needs.'
 },
 'l2-es-strength':{
  arcEn:'Preparation pays off',arcHe:'הכנה מוקדמת מוכיחה את עצמה',
  lesson:'אין להסיק יכולת ממראה חיצוני או מן התפקיד הקטן שניתן לאדם. הכנה שקטה, תשומת לב לכללי בטיחות והנהגה משותפת הן צורות ממשיות של כוח.',
  lessonEn:'Ability cannot be inferred from appearance or from the small role someone receives. Quiet preparation, attention to safety, and shared leadership are genuine forms of strength.'
 },
 'l2-es-food-project':{
  arcEn:'Search for an explanation',arcHe:'חיפוש אחר הסבר',
  lesson:'עזרה אחראית מגינה גם על בטיחות המזון וגם על פרטיות המשפחות. בדיקת שעות, תיעוד כשל ושינוי המסלול הופכים כוונה טובה למערכת שאפשר לסמוך עליה.',
  lessonEn:'Responsible food support protects both food safety and family privacy. Checking schedules, recording a failure, and changing the route turn good intentions into a system people can trust.'
 },
 'l2-es-river':{
  arcEn:'Chain reaction',arcHe:'תגובת שרשרת',
  lesson:'מפגע סביבתי עשוי להתחיל בכשל תחזוקה קטן ולהתפשט דרך רוח, גשם וניקוז. מיפוי רצף האירועים, בדיקת התיקון ומעקב מתמשך יעילים יותר מהאשמה מהירה.',
  lessonEn:'Environmental damage may begin with a small maintenance failure and spread through wind, rain, and drainage. Mapping the chain, testing the repair, and monitoring later storms work better than quick blame.'
 },
 'l3-a1-final-place':{
  arcEn:'Moral dilemma',arcHe:'דילמה בין ערכים',
  lesson:'החלטה הוגנת נשענת על כללים שנקבעו מראש ואינה מסתירה את המחיר שלה. בחירה בעבודת צוות עלולה לעלות בנקודות, אך היא מבהירה איזה סוג קבוצה רוצים לבנות.',
  lessonEn:'A fair decision follows criteria set in advance and does not hide its cost. Choosing teamwork may cost points, but it clarifies the kind of team being built.'
 },
 'l3-a1-park':{
  arcEn:'Shared task, changed relationship',arcHe:'משימה משותפת שמשנה יחסים',
  lesson:'מאבק ציבורי משתפר כאשר מקשיבים גם לצורך שמנגד ואוספים נתונים אמינים. פתרון משותף עשוי לשמור על הערך המרכזי ובכל זאת לדרוש ויתור גלוי.',
  lessonEn:'Public advocacy improves when people listen to the competing need and gather reliable evidence. A shared solution may protect the central value while still requiring an honest sacrifice.'
 },
 'l3-a1-empty-seat':{
  arcEn:'Help from a friend',arcHe:'קבלת עזרה מחבר',
  lesson:'תמיכה טובה מתחילה בשאלה מה באמת יעזור. עזרה קצרה, ברורה ומתואמת יכולה לשמור על קשר ועל עצמאות בלי להציף את מי שמחלים.',
  lessonEn:'Useful support begins by asking what the person actually needs. Clear, coordinated help can preserve both connection and independence during recovery.'
 },
 'l3-a2-anonymous-account':{
  arcEn:'Secret revealed',arcHe:'סוד שנחשף',
  lesson:'אנונימיות אינה מבטלת אחריות. תיקון אמיתי דורש לעצור את הפגיעה, להודות בחלק האישי, לפרסם תיקון ברור ולכבד את זכותו של הנפגע לקבוע את גבולות הקשר.',
  lessonEn:'Anonymity does not remove responsibility. Repair requires stopping the harm, admitting one’s role, correcting the record clearly, and respecting the harmed person’s boundaries.'
 },
 'l3-a2-volunteer-truth':{
  arcEn:'Mistake and repair',arcHe:'טעות ותיקון',
  lesson:'התנדבות מאבדת את משמעותה כאשר המספרים חשובים יותר מן האנשים. דיווח נכון, קבלת מחיר ממשי והמשך עשייה גם בלי פרס מחזירים את המטרה למרכז.',
  lessonEn:'Service loses its meaning when numbers become more important than people. Correct reporting, acceptance of a real cost, and continued work without a prize restore its purpose.'
 },
 'l3-a2-repair-cafe':{
  arcEn:'Shared task, changed relationship',arcHe:'משימה משותפת שמשנה יחסים',
  lesson:'שיתוף פעולה בין דורות אינו מבוסס על כך שצד אחד יודע הכול. ניסיון, ידיים יציבות, הקשבה וכלים חדשים מתחברים כאשר כל משתתף מכיר גם ביכולתו וגם במגבלתו.',
  lessonEn:'Intergenerational cooperation does not require one side to know everything. Experience, steady hands, listening, and newer tools become stronger when each person recognizes both ability and limitation.'
 },
 'l3-es-promise':{
  arcEn:'Promise under pressure',arcHe:'הבטחה תחת לחץ',
  lesson:'הבטחה לשמור סוד אינה גוברת על סכנה ממשית. אפשר להגן על פרטיות ככל האפשר, לפנות רק למבוגר האחראי ולקבל את המחיר שהבחירה הבטוחה מטילה על החברות.',
  lessonEn:'A promise of secrecy does not outweigh a concrete safety risk. Privacy can still be protected by telling only the responsible adult and accepting the cost that the safer choice may place on a friendship.'
 },
 'l3-es-winning':{
  arcEn:'Moral dilemma',arcHe:'דילמה בין ערכים',
  lesson:'משחק הוגן נבחן כאשר האמת עלולה למחוק ניצחון. דיווח עצמי עשוי לעלות במדליה וביחסים עם חברי הקבוצה, אך הוא שומר על משמעותם של הכללים.',
  lessonEn:'Fair play is tested when honesty may erase a victory. Self-reporting can cost a medal and strain team relationships, yet it preserves the meaning of the rules.'
 },
 'l3-es-neighborhood-plan':{
  arcEn:'Search for an explanation',arcHe:'חיפוש אחר פתרון מבוסס־ראיות',
  lesson:'תכנון ציבורי טוב אינו בוחר סיסמה אחת ומסתיר את המחיר. ספירה, נגישות, דיור, תחבורה וצרכים מסחריים צריכים להיבדק יחד, והחלופה המשופרת חייבת להציג גם את מה שלא פתרה.',
  lessonEn:'Sound public planning does not choose one slogan and hide the cost. Housing, transport, access, trees, and local business needs must be examined together, and an improved plan must state what it still does not solve.'
 },
 'l1-a1-broken-pencil':{
  arcEn:'Help from a friend',arcHe:'קבלת עזרה מחבר',
  lesson:'הצעה שקטה יכולה לשמור על כבודו של מי שנתקע. קבלת העזרה, החזרת הציוד והוספת עיפרון משותף הופכות רגע אישי להרגל של אחריות הדדית.',
  lessonEn:'A quiet offer can protect the dignity of a person who is stuck. Accepting help, returning the item, and adding a shared pencil turn one kind moment into mutual responsibility.'
 },
 'l1-a1-rainy-walk':{
  arcEn:'Unwelcome surprise',arcHe:'הפתעה לא צפויה',
  lesson:'לחץ להגיע בזמן אינו הופך דרך מסוכנת לבטוחה. עצירה, ויתור על קיצור הדרך והודעה לבית עשויים לגרום לאיחור, אך הם מונעים סיכון מיותר.',
  lessonEn:'Pressure to arrive on time does not make a dangerous route safe. Pausing, rejecting a shortcut, and informing home may cause a delay, but they prevent an unnecessary risk.'
 },
 'l1-a1-class-plant':{
  arcEn:'Mistake and repair',arcHe:'טעות ותיקון',
  lesson:'אחריות משותפת דורשת תפקידים ברורים ומדידה, לא רק כוונה טובה. גם לאחר טעות חשוב לבדוק, להמתין ולפעול לפי מצבו של הצמח במקום להגיב בפזיזות.',
  lessonEn:'Shared responsibility needs clear roles and measurement, not only good intentions. After a mistake, checking and waiting can be wiser than reacting too quickly.'
 },
 'l1-a2-spare-seat':{
  arcEn:'Unwelcome surprise',arcHe:'הפתעה לא צפויה',
  lesson:'עייפות ואי־נוחות אינן מבטלות את הצורך לשים לב לאחר. עזרה מכבדת מציעה מקום ותמיכה, אך משאירה לאדם האחר בחירה ועצמאות.',
  lessonEn:'Tiredness and discomfort do not remove the need to notice another person. Respectful help offers space and support while preserving the other person’s choice and independence.'
 },
 'l1-a2-missed-practice':{
  arcEn:'Misunderstanding',arcHe:'אי־הבנה שמתבהרת',
  lesson:'סיבה מוצדקת להיעדרות אינה מוחקת את השפעתה על הקבוצה. הודעה ברורה, הקשבה לפני האשמה וקבלת מחיר מעשי מאפשרות לתקן אי־הבנה בלי להתעלם מאחריות.',
  lessonEn:'A justified absence does not erase its effect on a team. Clear communication, listening before blame, and accepting a practical consequence allow a misunderstanding to be repaired responsibly.'
 },
 'l1-a2-reusable-bottle':{
  arcEn:'Second attempt',arcHe:'כישלון וניסיון שני',
  lesson:'כוונה טובה אינה מספיקה כאשר הבחירה החדשה אינה נוחה. מדידה, תיקון מכשול וניסיון נוסף הופכים הבטחה להרגל, וגם תוצאה טובה צריכה להציג את הבעיה שעדיין נותרה.',
  lessonEn:'Good intentions are not enough when a new choice is inconvenient. Measurement, removal of an obstacle, and a second attempt can turn a promise into a habit while still acknowledging what remains unsolved.'
 },
 'l1-es-new-glasses':{
  arcEn:'Small courage',arcHe:'אומץ קטן',
  lesson:'גבול אישי יכול להיאמר בשקט ובבהירות. התנצלות אמיתית אינה דורשת מן הנפגע להעמיד פנים שהפגיעה הייתה חסרת חשיבות, והמשך רגיל של היום יכול להיות מעשה של ביטחון.',
  lessonEn:'A personal boundary can be stated calmly and clearly. A genuine apology does not require the hurt person to pretend that the harm was unimportant, and continuing an ordinary day can itself be an act of confidence.'
 },
 'l1-es-school-map':{
  arcEn:'Shared task, changed relationship',arcHe:'משימה משותפת שמשנה יחסים',
  lesson:'מפה נגישה אינה נוצרת רק מן ההנחות של המעצבים. בדיקה עם משתמשים שונים, שימוש ביותר מצבע אחד ותיקון חוזר הופכים את מי שנתפס כזקוק לעזרה לשותף בתכנון.',
  lessonEn:'An accessible map cannot be built only from its designers’ assumptions. Testing with different users, communicating through more than color, and revising repeatedly turn the supposed recipients of help into design partners.'
 },
 'l1-es-bird-nest':{
  arcEn:'Preparation pays off',arcHe:'הכנה מוקדמת מוכיחה את עצמה',
  lesson:'טיפול אחראי בחיות בר דורש לעיתים מרחק ואיפוק ולא מגע. תכנית ברורה ותיאום עם כל המבוגרים בסביבה מונעים מהתלהבות או מכוונה טובה להפוך להפרעה.',
  lessonEn:'Responsible care for wildlife may require distance and restraint rather than contact. A clear plan shared with every adult in the area prevents excitement or good intentions from becoming harmful interference.'
 },
 'l2-a1-library-book':{
  arcEn:'Mistake and repair',arcHe:'טעות ותיקון',
  lesson:'הסתרת נזק מעבירה את הבעיה לקורא הבא. דיווח מיידי, הגנה על מי שממתין וקבלת חלק בתיקון בונים אחריות גם כאשר אי־אפשר להחזיר את הספר למצבו הקודם.',
  lessonEn:'Hiding damage passes the problem to the next reader. Prompt reporting, protecting the person who is waiting, and taking part in the repair build responsibility even when the book cannot be restored completely.'
 },
 'l2-a1-lunch-table':{
  arcEn:'Misunderstanding',arcHe:'אי־הבנה שמתבהרת',
  lesson:'שתיקה או יציאה מוקדמת אינן מוכיחות שאדם רוצה להיות לבדו. שאלה פשוטה, זמן וקבלת בחירתו של האחר מאפשרים לקשר לצמוח בלי לדבר במקומו.',
  lessonEn:'Silence or an early departure does not prove that someone wants to be alone. A simple question, time, and respect for the other person’s choice allow connection to grow without speaking for them.'
 },
 'l2-a1-water-leak':{
  arcEn:'Discovery',arcHe:'גילוי בעקבות רמזים',
  lesson:'תצפית זהירה נעשית מועילה כאשר מתעדים שינוי, מדווחים שוב ומתרחקים מאזור שעלול להיות מסוכן. שני רמזים ברורים יכולים להפוך חשד קטן לתיקון שמונע בזבוז ונזק.',
  lessonEn:'Careful observation becomes useful when changes are recorded, concerns are reported again, and people stay away from possible danger. Two clear clues can turn a small suspicion into a repair that prevents waste and damage.'
 },
 'l2-a2-group-credit':{
  arcEn:'Unexpected ability',arcHe:'יכולת שלא זכתה להכרה',
  lesson:'הכרה הוגנת צריכה לשקף את העבודה בפועל ולא רק את מי שמדבר מול קהל. תיקון פומבי, רישום משימות ומתן בחירה אמיתית בתפקיד מאפשרים ליכולת שקטה לקבל מקום בלי להפוך אותה להצגה.',
  lessonEn:'Fair recognition should reflect the work itself, not only the people who speak in public. A visible correction, a shared task record, and genuine role choice give quiet expertise room without turning it into a performance.'
 },
 'l3-a2-food-waste':{
  arcEn:'Search for an explanation',arcHe:'חיפוש אחר הסבר',
  lesson:'צמצום בזבוז דורש למדוד את מקור הבעיה ולא להאשים תלמידים או לבחור פתרון שמסכן בטיחות וכבוד. אפשרות למנה קטנה, תוספת לפי צורך ותרומת מזון סגור יוצרות שינוי שאפשר לבדוק.',
  lessonEn:'Reducing waste requires measuring its source rather than blaming students or choosing a solution that risks safety and dignity. Flexible portions, second servings, and donation of sealed food create a change that can be tested.'
 },
 'l3-es-captain-choice':{
  arcEn:'Moral dilemma',arcHe:'דילמה בין ערכים',
  lesson:'כלל הוגן נבחן כאשר אכיפתו גובה מחיר ממשי. מנהיגות עקבית אינה מבטיחה ניצחון, אך היא מונעת ממעמד וכישרון להפוך אדם לחריג מן האחריות המשותפת.',
  lessonEn:'A fair rule is tested when enforcing it carries a real cost. Consistent leadership cannot guarantee victory, but it prevents status and talent from becoming exemptions from shared responsibility.'
 },
 'l3-es-private-donation':{
  arcEn:'Misunderstanding',arcHe:'אי־הבנה שמתבהרת',
  lesson:'בקשת עזרה עלולה לחשוף משפחה גם בלי לציין את שמה. הקשבה להתנגדות, הסרת פרטים מזהים ושימוש בגורם מהימן מאפשרים לענות על צורך בלי להפוך את המקבל לסיפור ציבורי.',
  lessonEn:'An appeal for help can expose a family even without naming it. Listening to an objection, removing identifying details, and using a trusted intermediary can meet the need without turning the receiver into a public story.'
 },
 'l3-es-clean-transport':{
  arcEn:'Shared task, changed relationship',arcHe:'משימה משותפת שמשנה יחסים',
  lesson:'תכנית תחבורה אחראית חייבת לבדוק יחד בטיחות, זיהום ונגישות. מסלול משותף, מדידה וניסוי יכולים להפוך עמדות יריבות לפתרון טוב יותר, אך גם הפתרון דורש משאבי פיקוח גלויים.',
  lessonEn:'Responsible transport planning must examine safety, pollution, and access together. A shared route test, measurement, and a controlled trial can turn opposing positions into a stronger plan, while its supervision cost must remain visible.'
 },
 'new-1-a1-helmet-handlebar':{
  arcEn:'Temptation and consequence',arcHe:'פיתוי ותוצאה',
  lesson:'גם רכיבה קצרה יכולה לכלול עצירה פתאומית. קסדה מגינה רק כשהיא מהודקת על הראש, והרגל בטיחות נכון מתחיל לפני שנוגעים בדוושות.',
  lessonEn:'Even a short ride can include a sudden stop. A helmet protects only when it is fastened on the rider’s head, and the safety habit begins before the pedals move.'
 },
 'new-1-a1-wrong-classroom':{
  arcEn:'Small courage',arcHe:'אומץ קטן',
  lesson:'אמירת משפט פשוט כמו ״אני בכיתה הלא נכונה״ דורשת אומץ כאשר מרגישים מבוכה. בקשת עזרה מכבדת חוסכת זמן, ועזרה שקיבלנו יכולה לעבור לתלמיד הבא.',
  lessonEn:'A simple sentence such as “I am in the wrong room” can require courage during embarrassment. Respectful help saves time, and received help can later be passed to another student.'
 },
 'new-1-a1-missing-notebook':{
  arcEn:'Search for an explanation',arcHe:'חיפוש אחר הסבר',
  lesson:'חיפוש יעיל מתחיל בשחזור המקום האחרון וברמז מסוים, לא בבדיקה חוזרת של אותם מקומות. סימון ברור של הציוד עוזר למנוע את הבעיה הבאה.',
  lessonEn:'An effective search retraces the last known place and follows a specific clue instead of checking the same locations repeatedly. Clear labels help prevent the next loss.'
 },
 'new-1-a1-safe-bicycle-ride':{
  arcEn:'Preparation pays off',arcHe:'הכנה מוקדמת מוכיחה את עצמה',
  lesson:'בדיקת קסדה, בלמים ומחזיר אור לפני הרכיבה עשויה לגרום לעיכוב קטן, אך היא מונעת יציאה עם תקלה. לאחר מכן גם החבר מאמץ את אותה בדיקה.',
  lessonEn:'Checking a helmet, brakes, and reflector before riding may cause a short delay, but it prevents departure with an unsafe bicycle. The careful routine then passes to a friend.'
 },
 'new-1-a1-class-pet':{
  arcEn:'Unexpected ability',arcHe:'יכולת מפתיעה',
  lesson:'טיפול בבעל חיים דורש תשומת לב לשינויים קטנים ותפקידים ברורים. תלמידה שקטה מזהה רמז חשוב, ומבוגר בודק את הציוד לפני שהכיתה משנה את המזון.',
  lessonEn:'Animal care requires attention to small changes and clear roles. A quiet student notices an important clue, and an adult checks the equipment before the class changes the food.'
 },
 'new-1-a1-one-more-video':{
  arcEn:'Temptation and consequence',arcHe:'פיתוי ותוצאה',
  lesson:'הפעלה אוטומטית יכולה להפוך סרטון אחד לזמן שאבד. כיבוי ההפעלה, הרחקת הטלפון ושימוש בטיימר עוזרים לעצור לפני שהסרטון הבא מתחיל.',
  lessonEn:'Autoplay can turn one video into lost time. Turning it off, moving the phone away, and using a timer help the viewer stop before the next video begins.'
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
 const layer={1:'ז׳–ח׳',2:'ח׳–ט׳',3:'ט׳–י׳'}[s.level];
 if(s.group==='A1')return `רמת האנגלית: קבוצת תמיכה המבוססת על Band II. ${count} המשפטים קצרים וישירים יחסית, סדר האירועים ברור, ומילים שימושיות חוזרות בהקשרים מעט שונים. הכמות והתחביר מותאמים לשכבת ${layer}, אך העלילה עצמה אינה ילדותית.`;
 return `רמת האנגלית: קבוצת ביניים־גבוהה, עם אוצר מילים ישיר ומדורג${s.level===3?' מרשימות A–D':''}. ${count} המשפטים כוללים קשרי זמן, סיבה ותוצאה ומשפטים מורכבים במידה מבוקרת. המבנים המתקדמים מותאמים לשכבת ${layer} ומשולבים רק כאשר הם תורמים למשמעות.`;
}
function finalParentGoals(s,count,arc){
 if(s.group==='ES'){
  const article=[8,11,18].includes(count)?'an':'a';
  return `English-learning goals: sustain attention across ${article} ${count}-sentence narrative; infer motive and emotion from actions and concrete details; acquire precise vocabulary through meaningful repetition; track cause, consequence, and earlier events; and interpret how the ${arc.en.toLowerCase()} structure builds tension and resolution. Past Perfect or controlled inversion is used only when it clarifies chronology or emphasis.`;
 }
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
  s.parentLessonEn=meta?.lessonEn||lessonEnByArc[arc.en];
  s.parentSummary='';s.parentLesson='';
 }else{
  s.parentSummary=(s.descHe||`הסיפור עוסק ב${s.he}.`)+' התקציר מציג את נקודת המוצא בלבד ואינו מגלה מראש את רגע ההכרעה ואת תוצאתו.';
  s.parentLesson=meta?.lesson||lessonByArc[arc.en];
  if(meta?.lessonEn){
   s.parentSummaryEn=s.descEn+' This summary presents only the starting point and does not reveal the decisive moment or outcome.';
   s.parentLessonEn=meta.lessonEn;
  }
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
