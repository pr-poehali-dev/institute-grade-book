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

type DayLesson = {
  date: Date;
  value: string;
};

type SubjectSchedule = {
  subject: string;
  dayOfWeek: number;
  lessons: DayLesson[];
  average: string;
};

const generateScheduleData = (): SubjectSchedule[] => {
  const startDate = new Date(2024, 8, 1);
  const endDate = new Date(2025, 0, 8);
  const today = new Date(2024, 9, 23);
  
  const subjects = [
    { name: 'История медицины', day: 1 },
    { name: 'Микробиология', day: 1 },
    { name: 'Педагогика', day: 1 },
    { name: 'ОЗПТ', day: 2 },
    { name: 'Профилактика', day: 2 },
    { name: 'Патологическая анатомия', day: 2 },
    { name: 'Биологическая химия', day: 3 },
    { name: 'Нормальная физиология', day: 3 },
    { name: 'Биоэтика', day: 4 },
    { name: 'Патологическая физиология', day: 4 },
    { name: 'Физическая культура', day: 4 },
    { name: 'ПХС', day: 5 },
    { name: 'ПОС', day: 5 },
    { name: 'ПТС', day: 5 },
  ];

  const grades = [3, 4, 4, 5, 5];
  
  return subjects.map((subj, subjectIndex) => {
    const lessons: DayLesson[] = [];
    let gradeSum = 0;
    let gradeCount = 0;
    
    const hasAbsence = (subjectIndex + 1) % 3 === 0;
    let absenceAdded = false;
    
    const currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      if (currentDate.getDay() === subj.day) {
        if (currentDate <= today) {
          const rand = Math.random();
          
          if (rand < 0.5) {
            lessons.push({ date: new Date(currentDate), value: '' });
          } else {
            if (hasAbsence && !absenceAdded && Math.random() < 0.15) {
              lessons.push({ date: new Date(currentDate), value: 'Н' });
              absenceAdded = true;
            } else {
              const grade = grades[Math.floor(Math.random() * grades.length)];
              lessons.push({ date: new Date(currentDate), value: grade.toString() });
              gradeSum += grade;
              gradeCount++;
            }
          }
        } else {
          lessons.push({ date: new Date(currentDate), value: '' });
        }
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    const average = gradeCount > 0 ? (gradeSum / gradeCount).toFixed(2) : '0.00';
    
    return {
      subject: subj.name,
      dayOfWeek: subj.day,
      lessons,
      average
    };
  });
};

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

  const scheduleData = generateScheduleData();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username) {
      setUsernameError(true);
      return;
    }
    setIsLoggedIn(true);
  };

  const getValueColor = (value: string) => {
    if (value === '5') return 'bg-green-100 text-green-800 border-green-200';
    if (value === '4') return 'bg-blue-100 text-blue-800 border-blue-200';
    if (value === '3') return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    if (value === '2') return 'bg-red-100 text-red-800 border-red-200';
    if (value === 'Н') return 'bg-orange-100 text-orange-800 border-orange-200';
    return 'bg-gray-50 text-gray-400 border-gray-200';
  };

  const formatDate = (date: Date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    return `${day}.${month}`;
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

  if (selectedSubject) {
    const subjectData = scheduleData.find(s => s.subject === selectedSubject);
    
    return (
      <div className="min-h-screen bg-background">
        <header className="bg-white shadow-sm">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Button variant="ghost" size="sm" onClick={() => setSelectedSubject(null)}>
                  <Icon name="ArrowLeft" size={20} />
                </Button>
                <div>
                  <h1 className="text-2xl font-bold text-primary">{selectedSubject}</h1>
                  <p className="text-sm text-muted-foreground">Средний балл: {subjectData?.average}</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          <Card>
            <CardHeader>
              <CardTitle>Посещаемость и оценки</CardTitle>
              <CardDescription>С 01.09.2024 по 08.01.2025</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 gap-2">
                {subjectData?.lessons.map((lesson, index) => (
                  <div
                    key={index}
                    className={`flex flex-col items-center justify-center p-2 rounded border ${getValueColor(lesson.value)}`}
                  >
                    <div className="text-xs font-medium mb-1">{formatDate(lesson.date)}</div>
                    <div className="text-lg font-bold">
                      {lesson.value || '—'}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-muted rounded-lg">
                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-green-100 border border-green-200"></div>
                    <span>Отлично (5)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-blue-100 border border-blue-200"></div>
                    <span>Хорошо (4)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-yellow-100 border border-yellow-200"></div>
                    <span>Удовл. (3)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-orange-100 border border-orange-200"></div>
                    <span>Пропуск (Н)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-gray-50 border border-gray-200"></div>
                    <span>Нет данных</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
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

          <TabsContent value="diary" className="space-y-6 animate-fade-in">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Icon name="BookOpen" className="text-primary" />
                      Электронный дневник
                    </CardTitle>
                    <CardDescription>Оценки и посещаемость по предметам</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Label htmlFor="group-select" className="text-sm">Группа:</Label>
                    <Select value={selectedGroup} onValueChange={setSelectedGroup}>
                      <SelectTrigger id="group-select" className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ЛД-21">ЛД-21</SelectItem>
                        <SelectItem value="ЛД-22">ЛД-22</SelectItem>
                        <SelectItem value="ЛД-23">ЛД-23</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {scheduleData.map((subj) => (
                    <div
                      key={subj.subject}
                      onClick={() => setSelectedSubject(subj.subject)}
                      className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent transition-colors cursor-pointer"
                    >
                      <div className="flex-1">
                        <h3 className="font-medium">{subj.subject}</h3>
                      </div>
                      <div className="flex items-center gap-4">
                        <Badge variant="outline" className="font-semibold">
                          Средний: {subj.average}
                        </Badge>
                        <Icon name="ChevronRight" size={20} className="text-muted-foreground" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

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
                      <SelectItem value="academic">Академическая справка</SelectItem>
                      <SelectItem value="leave">Заявление на отпуск</SelectItem>
                      <SelectItem value="certificate">Справка о обучении</SelectItem>
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
                    className="w-full min-h-[150px] p-3 rounded-md border border-input bg-background resize-none"
                    placeholder="Введите текст вашего заявления..."
                  />
                </div>

                <Button className="w-full">
                  <Icon name="Send" size={16} className="mr-2" />
                  Отправить заявление
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="History" className="text-primary" />
                  История заявлений
                </CardTitle>
                <CardDescription>Ранее поданные заявления</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 rounded-lg border bg-card">
                    <div className="flex-1">
                      <h3 className="font-medium">Справка о обучении</h3>
                      <p className="text-sm text-muted-foreground">15.10.2025</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800 border-green-200">Одобрено</Badge>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-lg border bg-card">
                    <div className="flex-1">
                      <h3 className="font-medium">Академическая справка</h3>
                      <p className="text-sm text-muted-foreground">08.10.2025</p>
                    </div>
                    <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">На рассмотрении</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contacts" className="space-y-6 animate-fade-in">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Mail" className="text-primary" />
                  Контакты
                </CardTitle>
                <CardDescription>Контактная информация деканата и администрации</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Icon name="Phone" className="text-primary" size={20} />
                    </div>
                    <div>
                      <h3 className="font-medium">Телефон деканата</h3>
                      <p className="text-sm text-muted-foreground">+7 (495) 123-45-67</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Icon name="Mail" className="text-primary" size={20} />
                    </div>
                    <div>
                      <h3 className="font-medium">Email деканата</h3>
                      <p className="text-sm text-muted-foreground">dekanat@rosunimed.ru</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Icon name="MapPin" className="text-primary" size={20} />
                    </div>
                    <div>
                      <h3 className="font-medium">Адрес</h3>
                      <p className="text-sm text-muted-foreground">г. Москва, ул. Медицинская, д. 1</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Icon name="Clock" className="text-primary" size={20} />
                    </div>
                    <div>
                      <h3 className="font-medium">Часы работы</h3>
                      <p className="text-sm text-muted-foreground">Пн-Пт: 9:00 - 18:00</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
