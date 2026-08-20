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
  ['By the time the connection was noticed, several people were involved.','כאשר הבחינו בקשר כבר היו מעורבים כמה אנשים.','Several people became involved before anyone saw the pattern.'],
  ['Each person had seen only one part of the sequence.','כל אדם ראה רק חלק אחד מן הרצף.','Each person knew only one part of what had happened.'],
  ['Putting the events in order revealed where the chain had begun.','סידור האירועים חשף היכן התחילה השרשרת.','The order of events showed the starting point.'],
  ['The student responsible felt the room become suddenly quiet.','התלמיד האחראי חש שהחדר השתתק לפתע.','The responsible student felt everyone waiting.'],
  ['Stopping the next effect mattered more than defending the first action.','עצירת התוצאה הבאה הייתה חשובה יותר מהגנה על הפעולה הראשונה.','Preventing more harm became more important than making excuses.'],
  ['Several people worked together to interrupt the sequence.','כמה אנשים פעלו יחד כדי לעצור את הרצף.','The group worked together to stop the chain.'],
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
  ['Afterward, asking for help no longer belonged to only one of them.','לאחר מכן בקשת עזרה כבר לא הייתה שייכת רק לאחד מהם.','Afterward, both felt free to ask for support.']]}
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
function anchors(s){const n=s.scenes.length;if(s.id.startsWith('new-'))return[s.scenes[0],s.scenes[1],s.scenes[n-2],s.scenes[n-1]];return[s.scenes[0],s.scenes[Math.round((n-1)/3)],s.scenes[Math.round((n-1)*2/3)],s.scenes[n-1]]}
function details(s){
 const t=(s.id+' '+s.en+' '+s.descEn).toLowerCase();
 if(/new.student|spare.seat|lunch.table|empty.seat|new.glasses|appearance|welcome|helping.neighbor/.test(t))return[
  ['An empty chair stood beside the noisiest table in the room.','כיסא ריק עמד ליד השולחן הרועש ביותר בחדר.','An empty chair stood beside a busy table.'],
  ['The new student held a lunch box but did not open it.','התלמיד החדש החזיק קופסת אוכל אך לא פתח אותה.','The new student held a closed lunch box.'],
  ['A classmate pulled the empty chair back and pointed to it.','חבר לכיתה משך את הכיסא הריק לאחור והצביע עליו.','A classmate pulled out the empty chair.'],
  ['The first smile appeared when somebody made room at the table.','החיוך הראשון הופיע כאשר מישהו פינה מקום ליד השולחן.','The new student smiled when someone made room.']];
 if(/helmet|bicycle|scooter|ride/.test(t))return[
  ['The loose strap tapped against the handlebar as the wheels moved.','הרצועה הרופפת טפחה על הכידון בזמן שהגלגלים נעו.','The loose strap hit the handlebar while the rider moved.'],
  ['The sudden sound of the brake made nearby students turn around.','קול הבלימה הפתאומי גרם לתלמידים סמוכים להסתובב.','Nearby students turned when they heard the brake.'],
  ['For several seconds, the rider’s hands would not stop shaking.','במשך כמה שניות ידיו של הרוכב לא הפסיקו לרעוד.','The rider’s hands shook for several seconds.'],
  ['The unused helmet felt heavier when it was lifted from the ground.','הקסדה שלא נחבשה הרגישה כבדה יותר כאשר הורמה מן הקרקע.','The unworn helmet felt heavy after the fall.']];
 if(/screen|video|feed|phone|algorithm|digital tool|homework|project|answer/.test(t))return[
  ['The blue light of the screen remained on long after the room became quiet.','האור הכחול של המסך נשאר דולק זמן רב לאחר שהחדר השתתק.','The screen stayed bright in the quiet room.'],
  ['One unfamiliar word appeared twice, but the student did not look it up.','מילה לא מוכרת אחת הופיעה פעמיים, אך התלמיד לא בדק אותה.','The student ignored a word that appeared twice.'],
  ['A blinking cursor waited beside a sentence the student could not explain.','סמן מהבהב המתין ליד משפט שהתלמיד לא ידע להסביר.','The cursor waited beside a sentence the student did not understand.'],
  ['When a direct question was asked, the prepared answer suddenly seemed useless.','כאשר נשאלה שאלה ישירה, התשובה המוכנה נראתה לפתע חסרת תועלת.','A direct question made the prepared answer useless.']];
 if(/photo|headline|rumor|report|account|message|consent|evidence|image/.test(t))return[
  ['A cropped edge and a missing date were visible on the screen.','קצה חתוך ותאריך חסר נראו על המסך.','The screen showed a cropped edge and no date.'],
  ['The number of shares increased before anybody opened the original source.','מספר השיתופים גדל לפני שמישהו פתח את המקור המקורי.','People shared the claim before opening its source.'],
  ['One student enlarged the smallest detail instead of reading the loudest caption.','תלמיד אחד הגדיל את הפרט הקטן ביותר במקום לקרוא את הכיתוב הבולט ביותר.','One student studied a small detail instead of the dramatic caption.'],
  ['The correction looked much quieter than the claim it replaced.','התיקון נראה שקט בהרבה מן הטענה שהחליף.','The correction attracted less attention than the original claim.']];
 if(/team|group|credit|captain|runner|selection|sports/.test(t))return[
  ['One name remained alone at the bottom of the list.','שם אחד נשאר לבדו בתחתית הרשימה.','One name remained alone at the bottom of the list.'],
  ['The same confident hands rose before the quieter students could speak.','אותן ידיים בטוחות הורמו לפני שהתלמידים השקטים הספיקו לדבר.','The confident students answered before quieter students could speak.'],
  ['A chair scraped backward when somebody realized the decision had already been made.','כיסא נגרר לאחור כאשר מישהו הבין שההחלטה כבר התקבלה.','A student moved away after realizing the choice was already made.'],
  ['The overlooked contribution was still visible in the notes and corrections.','התרומה שלא זכתה להכרה עדיין נראתה ברשימות ובתיקונים.','The notes still showed who had done the hidden work.']];
 if(/water|garden|waste|energy|environment|plastic|transport/.test(t))return[
  ['A dark mark showed where the water or waste had collected each day.','סימן כהה הראה היכן הצטברו המים או הפסולת בכל יום.','A dark mark showed where the daily problem collected.'],
  ['The students counted the amount instead of describing it as “a lot.”','התלמידים ספרו את הכמות במקום לתאר אותה כ״הרבה״.','The students measured the problem instead of guessing.'],
  ['A simple map revealed that one small area caused most of the difficulty.','מפה פשוטה חשפה שאזור קטן אחד גרם לרוב הקושי.','A map showed that one place caused most of the problem.'],
  ['The first visible improvement appeared beside the mark they had recorded.','השיפור הנראה הראשון הופיע ליד הסימן שתיעדו.','The first improvement appeared beside the recorded mark.']];
 if(/emergency|hospital|first aid|injur|safety|workplace/.test(t))return[
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
  ['A folded note remained in the student’s hand.','פתק מקופל נשאר בידו של התלמיד.','The student kept holding a folded note.'],
  ['An empty chair made the absence impossible to ignore.','כיסא ריק הפך את החסר לבלתי אפשרי להתעלמות.','An empty chair made the absence clear.'],
  ['The student looked at the floor before answering.','התלמיד הביט ברצפה לפני שענה.','The student looked down before answering.'],
  ['The folded note was opened before the student answered.','הפתק המקופל נפתח לפני שהתלמיד ענה.','The student opened the folded note before answering.']];
}
function concreteFollow(s){
 const t=(s.id+' '+s.en+' '+s.descEn).toLowerCase();
 if(/helmet|bicycle|scooter|ride/.test(t))return[
  ['A friend pointed at the empty helmet before the rider reached the gate.','חבר הצביע על הקסדה הריקה לפני שהרוכב הגיע לשער.','A friend pointed to the helmet before the rider reached the gate.'],
  ['“Stop here,” the friend called when the front wheel began to turn.','״עצור כאן,״ קרא החבר כאשר הגלגל הקדמי התחיל להסתובב.','The friend called for the rider to stop.'],
  ['The rider put both feet on the ground and checked the loose strap.','הרוכב הניח את שתי רגליו על הקרקע ובדק את הרצועה הרופפת.','The rider stopped and checked the strap.'],
  ['A second helmet was brought from the shelf near the door.','קסדה נוספת הובאה מן המדף ליד הדלת.','They brought another helmet from a nearby shelf.'],
  ['The friend waited while the buckle clicked under the rider’s chin.','החבר המתין עד שהאבזם נסגר מתחת לסנטרו של הרוכב.','The friend waited until the helmet was fastened.'],
  ['They walked the scooter across the busy crossing instead of riding through it.','הם הובילו את הקורקינט ברגל במעבר החצייה העמוס במקום לרכוב בו.','They walked across the busy crossing.'],
  ['At the corner, a police officer looked at both helmets and nodded.','בפינה שוטר הביט בשתי הקסדות והנהן.','A police officer saw both helmets and nodded.'],
  ['The next afternoon, the helmet was already on before the wheels moved.','למחרת אחר הצהריים הקסדה כבר הייתה על הראש לפני שהגלגלים נעו.','The next ride began with the helmet already on.']];
 if(/screen|video|feed|phone|algorithm|digital tool|homework|project|answer|computer/.test(t))return[
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
 if(/team|group|credit|captain|runner|selection|sports|race/.test(t))return[
  ['The coach placed the list on the bench where everyone could read it.','המאמן הניח את הרשימה על הספסל במקום שכולם יכלו לקרוא אותה.','The coach placed the list where everyone could read it.'],
  ['One student folded their arms and moved away from the group.','תלמיד אחד שילב את זרועותיו והתרחק מן הקבוצה.','One student folded their arms and stepped away.'],
  ['A notebook showed who had planned, measured, corrected, and practiced.','מחברת הראתה מי תכנן, מדד, תיקן והתאמן.','A notebook showed each student’s work.'],
  ['The captain read every name aloud, including the quiet student’s name.','הקפטן קרא כל שם בקול, כולל שמו של התלמיד השקט.','The captain read every name aloud.'],
  ['During the final task, the quiet student noticed the open space first.','במשימה האחרונה התלמיד השקט הבחין ראשון במקום הפנוי.','The quiet student noticed the open space first.'],
  ['A short pass reached the last player just before the whistle.','מסירה קצרה הגיעה לשחקן האחרון רגע לפני השריקה.','A short pass reached the final player before the whistle.'],
  ['The group changed the names on the poster before displaying it.','הקבוצה שינתה את השמות על הכרזה לפני שהציגה אותה.','The group corrected the names on the poster.'],
  ['At the next meeting, tasks were written beside names from the start.','במפגש הבא המשימות נכתבו ליד השמות כבר מן ההתחלה.','At the next meeting, every task had a name beside it.']];
 if(/water|garden|waste|energy|environment|plastic|transport|park|river/.test(t))return[
  ['The class filled one clear bag with the rubbish collected before lunch.','הכיתה מילאה שקית שקופה אחת בפסולת שנאספה לפני ארוחת הצהריים.','The class filled one clear bag with rubbish.'],
  ['A student marked the water level on a bottle with a blue pen.','תלמיד סימן בעט כחול את גובה המים בבקבוק.','A student marked the water level on a bottle.'],
  ['The next morning, the mark was lower by two fingers.','למחרת בבוקר הסימן היה נמוך ברוחב שתי אצבעות.','The water level was clearly lower the next morning.'],
  ['They closed one leaking tap and placed a bucket under another.','הם סגרו ברז דולף אחד והניחו דלי מתחת לאחר.','They closed one leaking tap and placed a bucket under another.'],
  ['Dry leaves were moved away from the small drain.','עלים יבשים הורחקו מפתח הניקוז הקטן.','They moved dry leaves away from the drain.'],
  ['By Friday, the bucket stayed almost empty.','עד יום שישי הדלי נשאר כמעט ריק.','By Friday, little water had collected in the bucket.'],
  ['A green shoot appeared beside the stone marked on their map.','נבט ירוק הופיע ליד האבן שסומנה במפה שלהם.','A green shoot appeared beside a marked stone.'],
  ['The measurement chart remained on the classroom wall.','טבלת המדידות נשארה על קיר הכיתה.','The measurement chart stayed on the classroom wall.']];
 if(/emergency|hospital|first aid|injur|safety|workplace/.test(t))return[
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
  ['The student unfolded the note and read the last line again.','התלמיד פתח את הפתק וקרא שוב את השורה האחרונה.','The student opened the note and reread the last line.'],
  ['A classmate pulled an empty chair closer to the table.','חבר לכיתה קירב כיסא ריק אל השולחן.','A classmate moved an empty chair closer.'],
  ['“Sit here,” the classmate said, pointing to the chair.','״שב כאן,״ אמר החבר והצביע על הכיסא.','The classmate invited the student to sit down.'],
  ['The student stopped twisting the corner of the paper.','התלמיד הפסיק לסובב את פינת הדף.','The student stopped twisting the paper.'],
  ['They read the difficult line together, one word at a time.','הם קראו יחד את השורה הקשה, מילה אחר מילה.','They read the difficult line together.'],
  ['A pencil was passed across the table.','עיפרון הועבר מעבר לשולחן.','A pencil was passed across the table.'],
  ['The student wrote a short answer and looked up.','התלמיד כתב תשובה קצרה והרים את מבטו.','The student wrote a short answer and looked up.'],
  ['The empty chair was filled before the bell rang.','הכיסא הריק התמלא לפני הצלצול.','Someone sat in the empty chair before the bell.']];
}
function rebuild(s,arc){
 const core=anchors(s),need=s.scenes.length-4,fill=[],specific=[...details(s),...concreteFollow(s)];
 // Younger/support readers see concrete actions first. Abstract interpretation
 // is reserved for longer, higher-level stories after the event is visible.
 const source=s.level===1||s.group==='A1'?[...specific,...arc.lines,...extra]:[...specific,...arc.lines.slice(0,8),...extra,...arc.lines.slice(8)];
 const first=core[0]?.[0]?.[0]||'',match=first.match(/^([A-Z][a-z]+)\b/),name=match&&!/^(The|A|An|Students|Teenagers|People)$/.test(match[1])?match[1]:'';
 const personalize=row=>name?row.map(x=>x.replace(/\bOne student\b/g,name).replace(/\bThe student\b/g,name).replace(/\bthe student\b/g,name)):row;
 for(let i=0;i<need;i++)fill.push(pair(personalize(source[i%source.length]),s.group));
 // Preserve the original opening, disruption, decisive action and result.
 // These anchors keep the retained cover tied to an event in the new plot.
 const positions=[0,1,Math.round((s.scenes.length-1)*.75),s.scenes.length-1];
 const out=[];let ci=0,fi=0;
 for(let i=0;i<s.scenes.length;i++)out.push(ci<4&&i===positions[ci]?core[ci++]:fill[fi++]);
 return out.map(scene=>scene.map(part=>[part[0].replace(/, to\b/g,' to'),part[1]]));
}
const counters={},previousArc={};
// Legacy cover normalization: 20 portrait files converted to 1200x800 WebP.
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
 'Role reversal':'כל אדם יכול להיות לעיתים מסייע ולעיתים זקוק לעזרה. שיתוף יכולות ובקשה פתוחה לעזרה יוצרים קשר שוויוני וחזק יותר.'
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
 'Role reversal':'Everyone may sometimes help and sometimes need help. Sharing abilities and asking openly for support create a more equal relationship.'
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
 const t=(s.id+' '+s.en+' '+s.descEn).toLowerCase();
 const pick=a=>a[index%a.length];
 if(/wrong|damaged|cheat|mistake|sent by mistake|missing permission/.test(t))return pick([2,3,6]);
 if(/lost|missing|hidden|discovery|evidence|leak|nest/.test(t))return pick([4,5,0]);
 if(/help|neighbor|hospital|new student|lunch table|glasses|welcome|donation/.test(t))return pick([1,11,3]);
 if(/race|emergency|first aid|deadline/.test(t))return pick([5,0,6]);
 if(/practice|runner|interview|return|back to school/.test(t))return pick([6,1,8]);
 if(/team|group|credit|captain|quiet|selection|appearance/.test(t))return pick([7,11,3]);
 if(/promise|shift|commitment|volunteer/.test(t))return pick([8,6,11]);
 if(/photo|headline|rumor|report|account|image|false|unverified|consent/.test(t))return pick([9,4,2]);
 if(/screen|video|feed|phone|algorithm|homework|artificial|digital tool|good intention|waste|convenience/.test(t))return pick([10,9,2]);
 if(/conflict|role|leader|workplace|public meeting|whistleblower/.test(t))return pick([11,8,3]);
 if(/helmet|bicycle|scooter|ride|water|weather|shortage|transport/.test(t))return pick([0,5,6]);
 return fallback;
}
window.STORIES.forEach(s=>{
 const key=s.level+'-'+s.group,i=counters[key]||0; counters[key]=i+1;
 const explicitArc={'new-3-a2-first-bell':1,'new-3-es-unanswered-message':3,'new-3-es-winter-stage':11};
 const fallback=(i+(s.level-1)*4+(s.group==='A2'?2:s.group==='ES'?5:0))%structures.length;
 let arcIndex=explicitArc[s.id]??thematicArc(s,fallback,i);
 if(explicitArc[s.id]===undefined&&previousArc[key]===arcIndex)arcIndex=fallback!==arcIndex?fallback:(arcIndex+1)%structures.length;
 previousArc[key]=arcIndex;
 const arc=structures[arcIndex];
 s.plotStructureEn=arc.en;s.plotStructureHe=arc.he;
 if(!explicit.has(s.id))s.scenes=rebuild(s,arc);
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
  s.parentLesson=lessonByArc[arc.en];
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
