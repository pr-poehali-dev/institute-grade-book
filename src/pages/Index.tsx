import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import Icon from '@/components/ui/icon';



type SubjectDetails = {
  subject: string;
  grades: { score: number; date: string; type: string }[];
  absences: { date: string; reason: string }[];
};

const mockSubjects: SubjectDetails[] = [
  { 
    subject: 'История медицины', 
    grades: [
      { score: 5, date: '15.10.2025', type: 'Зачет' },
      { score: 4, date: '08.10.2025', type: 'Контрольная' },
    ],
    absences: [
      { date: '01.10.2025', reason: 'Болезнь' },
    ]
  },
  { 
    subject: 'Микробиология', 
    grades: [
      { score: 4, date: '14.10.2025', type: 'Практика' },
      { score: 5, date: '07.10.2025', type: 'Лабораторная' },
    ],
    absences: []
  },
  { 
    subject: 'Педагогика', 
    grades: [
      { score: 5, date: '13.10.2025', type: 'Лекция-зал' },
    ],
    absences: []
  },
  { 
    subject: 'ОЗП', 
    grades: [
      { score: 5, date: '12.10.2025', type: 'Практика' },
      { score: 5, date: '05.10.2025', type: 'Семинар' },
    ],
    absences: []
  },
  { 
    subject: 'Профилактика', 
    grades: [
      { score: 4, date: '11.10.2025', type: 'Семинар' },
    ],
    absences: [
      { date: '04.10.2025', reason: 'Уважительная' },
    ]
  },
  { 
    subject: 'Патологическая анатомия', 
    grades: [
      { score: 5, date: '10.10.2025', type: 'Практика' },
      { score: 4, date: '03.10.2025', type: 'Коллоквиум' },
    ],
    absences: []
  },
  { 
    subject: 'Биологическая химия', 
    grades: [
      { score: 5, date: '09.10.2025', type: 'Аудитория' },
    ],
    absences: []
  },
  { 
    subject: 'Нормальная физиология', 
    grades: [
      { score: 4, date: '08.10.2025', type: 'Аудитория' },
      { score: 5, date: '01.10.2025', type: 'Тест' },
    ],
    absences: [
      { date: '06.10.2025', reason: 'Болезнь' },
    ]
  },
  { 
    subject: 'Биоэтика', 
    grades: [
      { score: 5, date: '07.10.2025', type: 'Лекция-зал' },
    ],
    absences: []
  },
  { 
    subject: 'Патофизиология', 
    grades: [
      { score: 5, date: '06.10.2025', type: 'Аудитория' },
      { score: 4, date: '29.09.2025', type: 'Практика' },
    ],
    absences: []
  },
];

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState('ЛД-21');
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [applicationText, setApplicationText] = useState('');
  const [applicationType, setApplicationType] = useState<string>('academic');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username) {
      setUsernameError(true);
      return;
    }
    setIsLoggedIn(true);
  };

  const getGradeColor = (score: number) => {
    if (score === 5) return 'bg-green-100 text-green-800 border-green-200';
    if (score === 4) return 'bg-blue-100 text-blue-800 border-blue-200';
    if (score === 3) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    return 'bg-red-100 text-red-800 border-red-200';
  };

  const calculateSubjectAverage = (subject: SubjectDetails) => {
    if (subject.grades.length === 0) return 0;
    return (subject.grades.reduce((acc, g) => acc + g.score, 0) / subject.grades.length).toFixed(2);
  };

  const getSubjectDetails = (subjectName: string) => {
    return mockSubjects.find(s => s.subject === subjectName);
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader className="text-center space-y-4 pb-8">
            <div className="flex justify-center">
              <img 
                src="https://cdn.poehali.dev/files/5674fcfc-3180-4337-8a33-929f67942c71.jpeg" 
                alt="РосУниМед" 
                className="w-48 h-48 object-contain opacity-40"
              />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold text-primary">Личный кабинет</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-base">
                  Имя пользователя <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    setUsernameError(false);
                  }}
                  className={usernameError ? 'border-destructive' : ''}
                  placeholder="Введите имя пользователя"
                />
                {usernameError && (
                  <div className="flex items-center gap-2 text-destructive text-sm mt-2">
                    <Icon name="AlertCircle" size={16} />
                    <span>Необходимо заполнить «Имя пользователя».</span>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-base">
                  Пароль <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Введите пароль"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="remember" 
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                />
                <label
                  htmlFor="remember"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Запомнить меня
                </label>
              </div>

              <Button type="submit" className="w-full py-6 text-base" size="lg">
                Вход
              </Button>

              <div className="text-center space-y-1">
                <p className="text-sm text-muted-foreground">
                  Хотите подать документы для поступления?
                </p>
                <Button variant="link" className="text-primary p-0 h-auto">
                  Зарегистрируйтесь.
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 animate-fade-in">
              <div>
                <h1 className="text-2xl font-bold text-primary">РосУниМед</h1>
                <p className="text-sm text-muted-foreground">Личный кабинет</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm">
                <Icon name="Bell" size={20} />
              </Button>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                  <Icon name="User" size={20} className="text-primary-foreground" />
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-medium">Студент</p>
                  <p className="text-xs text-muted-foreground">{selectedGroup}</p>
                </div>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setIsLoggedIn(false)}
                className="gap-2"
              >
                <Icon name="LogOut" size={16} />
                <span className="hidden md:inline">Выход</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="diary" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:inline-grid">
            <TabsTrigger value="diary" className="gap-2">
              <Icon name="BookOpen" size={16} />
              <span className="hidden sm:inline">Дневник</span>
            </TabsTrigger>
            <TabsTrigger value="applications" className="gap-2">
              <Icon name="FileText" size={16} />
              <span className="hidden sm:inline">Заявления</span>
            </TabsTrigger>
            <TabsTrigger value="contacts" className="gap-2">
              <Icon name="Mail" size={16} />
              <span className="hidden sm:inline">Контакты</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="applications" className="space-y-6 animate-fade-in">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="FileText" className="text-primary" />
                  Подать заявление
                </CardTitle>
                <CardDescription>Заполните форму для отправки заявления</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="applicationType">Тип заявления</Label>
                  <Select value={applicationType} onValueChange={setApplicationType}>
                    <SelectTrigger id="applicationType">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="academic">Академический отпуск</SelectItem>
                      <SelectItem value="certificate">Справка-вызов</SelectItem>
                      <SelectItem value="transfer">Перевод на другую группу</SelectItem>
                      <SelectItem value="documents">Выдача документов</SelectItem>
                      <SelectItem value="other">Другое</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="applicationText">Текст заявления</Label>
                  <textarea
                    id="applicationText"
                    value={applicationText}
                    onChange={(e) => setApplicationText(e.target.value)}
                    placeholder="Опишите ваше обращение..."
                    className="w-full min-h-[200px] p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div className="bg-muted/50 p-4 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Icon name="Info" size={20} className="text-primary mt-0.5" />
                    <div className="text-sm text-muted-foreground">
                      <p className="font-medium text-foreground mb-1">Важно:</p>
                      <ul className="list-disc list-inside space-y-1">
                        <li>Заявление будет рассмотрено в течение 3 рабочих дней</li>
                        <li>Ответ придёт на вашу университетскую почту</li>
                        <li>Указывайте все необходимые детали в тексте заявления</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <Button 
                  className="w-full" 
                  size="lg"
                  disabled={!applicationText.trim()}
                  onClick={() => {
                    alert('Заявление успешно отправлено!');
                    setApplicationText('');
                  }}
                >
                  <Icon name="Send" size={16} className="mr-2" />
                  Отправить заявление
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Clock" className="text-primary" />
                  История заявлений
                </CardTitle>
                <CardDescription>Ваши поданные заявления</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  <Icon name="Inbox" size={48} className="mx-auto mb-3 opacity-50" />
                  <p>У вас пока нет поданных заявлений</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="diary" className="space-y-6 animate-fade-in">
            {!selectedSubject ? (
              <Card>
                <CardHeader>
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Icon name="BookOpen" className="text-primary" />
                      Электронный дневник
                    </CardTitle>
                    <CardDescription>Выберите предмет для просмотра деталей</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {mockSubjects.map((subject, index) => (
                      <div
                        key={index}
                        onClick={() => setSelectedSubject(subject.subject)}
                        className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-card border rounded-xl hover:shadow-md transition-all cursor-pointer hover:border-primary"
                      >
                        <div className="flex-1 mb-3 sm:mb-0">
                          <h3 className="font-semibold text-foreground">{subject.subject}</h3>
                          <div className="flex gap-2 mt-2 flex-wrap items-center">
                            <Badge variant="secondary" className="text-xs">
                              Оценок: {subject.grades.length}
                            </Badge>
                            {subject.absences.length > 0 && (
                              <Badge variant="destructive" className="text-xs">
                                Пропусков: {subject.absences.length}
                              </Badge>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            <div className="text-2xl font-bold text-primary">
                              {calculateSubjectAverage(subject)}
                            </div>
                            <div className="text-xs text-muted-foreground">средний</div>
                          </div>
                          <Icon name="ChevronRight" className="text-muted-foreground" size={20} />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => setSelectedSubject(null)}
                      className="gap-2"
                    >
                      <Icon name="ArrowLeft" size={16} />
                      Назад
                    </Button>
                  </div>
                  <CardTitle className="flex items-center gap-2 mt-2">
                    <Icon name="BookOpen" className="text-primary" />
                    {selectedSubject}
                  </CardTitle>
                  <CardDescription>
                    Средний балл: {calculateSubjectAverage(getSubjectDetails(selectedSubject)!)}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                      <Icon name="Award" size={20} className="text-primary" />
                      Оценки
                    </h3>
                    <div className="space-y-2">
                      {getSubjectDetails(selectedSubject)?.grades.map((grade, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 bg-card border rounded-lg"
                        >
                          <div>
                            <Badge variant="secondary" className="text-xs mb-1">
                              {grade.type}
                            </Badge>
                            <p className="text-sm text-muted-foreground">{grade.date}</p>
                          </div>
                          <Badge className={`${getGradeColor(grade.score)} text-xl font-bold px-4 py-2 border`}>
                            {grade.score}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {getSubjectDetails(selectedSubject)?.absences.length! > 0 && (
                    <div>
                      <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                        <Icon name="AlertCircle" size={20} className="text-destructive" />
                        Пропуски
                      </h3>
                      <div className="space-y-2">
                        {getSubjectDetails(selectedSubject)?.absences.map((absence, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-3 bg-card border border-destructive/20 rounded-lg"
                          >
                            <div>
                              <p className="font-medium">{absence.date}</p>
                              <p className="text-sm text-muted-foreground">{absence.reason}</p>
                            </div>
                            <Icon name="X" size={20} className="text-destructive" />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="contacts" className="space-y-6 animate-fade-in">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Building" className="text-primary" />
                    Контактная информация
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Icon name="MapPin" className="text-primary mt-1" size={20} />
                    <div>
                      <p className="font-medium">Адрес</p>
                      <p className="text-sm text-muted-foreground">г. Москва, ул. Примерная, д. 123</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Icon name="Phone" className="text-primary mt-1" size={20} />
                    <div>
                      <p className="font-medium">Телефон</p>
                      <p className="text-sm text-muted-foreground">+7 (495) 123-45-67</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Icon name="Mail" className="text-primary mt-1" size={20} />
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-sm text-muted-foreground">info@rosunimed.ru</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Icon name="Globe" className="text-primary mt-1" size={20} />
                    <div>
                      <p className="font-medium">Веб-сайт</p>
                      <p className="text-sm text-muted-foreground">www.rosunimed.ru</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Clock" className="text-secondary" />
                    Часы работы
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                    <span className="font-medium">Понедельник - Пятница</span>
                    <span className="text-sm text-muted-foreground">9:00 - 18:00</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                    <span className="font-medium">Суббота</span>
                    <span className="text-sm text-muted-foreground">10:00 - 15:00</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                    <span className="font-medium">Воскресенье</span>
                    <span className="text-sm text-muted-foreground">Выходной</span>
                  </div>
                  <div className="mt-4 p-4 bg-primary/5 border rounded-xl">
                    <p className="text-sm font-medium mb-2 flex items-center gap-2">
                      <Icon name="Info" size={16} className="text-primary" />
                      Деканат
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Приём студентов: Пн, Ср, Пт с 14:00 до 17:00
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <footer className="bg-white border-t border-slate-200 mt-12">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © 2025 РосУниМед. Все права защищены.
            </p>
            <div className="flex gap-4">
              <Button variant="ghost" size="sm">
                <Icon name="Facebook" size={18} />
              </Button>
              <Button variant="ghost" size="sm">
                <Icon name="Twitter" size={18} />
              </Button>
              <Button variant="ghost" size="sm">
                <Icon name="Instagram" size={18} />
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;