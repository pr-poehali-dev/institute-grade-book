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

type Grade = {
  subject: string;
  score: number;
  date: string;
  type: string;
};

type Schedule = {
  time: string;
  subject: string;
  teacher: string;
  room: string;
};

const mockGrades: Grade[] = [
  { subject: 'Анатомия', score: 5, date: '15.10.2025', type: 'Экзамен' },
  { subject: 'Физиология', score: 4, date: '14.10.2025', type: 'Практика' },
  { subject: 'Биохимия', score: 5, date: '13.10.2025', type: 'Контрольная' },
  { subject: 'Фармакология', score: 4, date: '12.10.2025', type: 'Тест' },
  { subject: 'Патология', score: 5, date: '11.10.2025', type: 'Зачет' },
  { subject: 'Микробиология', score: 5, date: '10.10.2025', type: 'Практика' },
];

const mockSchedule: Schedule[] = [
  { time: '9:00 - 10:30', subject: 'Анатомия', teacher: 'Иванов И.И.', room: '201' },
  { time: '10:45 - 12:15', subject: 'Физиология', teacher: 'Петрова А.С.', room: '305' },
  { time: '12:30 - 14:00', subject: 'Биохимия', teacher: 'Сидоров В.П.', room: '115' },
  { time: '14:15 - 15:45', subject: 'Клиническая практика', teacher: 'Смирнова Е.А.', room: '402' },
];

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState('ЛД-21');

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

  const averageGrade = (mockGrades.reduce((acc, g) => acc + g.score, 0) / mockGrades.length).toFixed(2);

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
              <img 
                src="https://cdn.poehali.dev/files/6f2b9599-be4e-4d02-bc7b-41465f73e98f.png" 
                alt="РосУниМед" 
                className="w-16 h-16 object-contain"
              />
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
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="home" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
            <TabsTrigger value="home" className="gap-2">
              <Icon name="Home" size={16} />
              <span className="hidden sm:inline">Главная</span>
            </TabsTrigger>
            <TabsTrigger value="diary" className="gap-2">
              <Icon name="BookOpen" size={16} />
              <span className="hidden sm:inline">Дневник</span>
            </TabsTrigger>
            <TabsTrigger value="schedule" className="gap-2">
              <Icon name="Calendar" size={16} />
              <span className="hidden sm:inline">Расписание</span>
            </TabsTrigger>
            <TabsTrigger value="contacts" className="gap-2">
              <Icon name="Mail" size={16} />
              <span className="hidden sm:inline">Контакты</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="home" className="space-y-6 animate-fade-in">
            <div className="grid gap-6 md:grid-cols-3">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Средний балл</CardTitle>
                  <Icon name="TrendingUp" className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-primary">{averageGrade}</div>
                  <p className="text-xs text-muted-foreground mt-1">За текущий семестр</p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Всего оценок</CardTitle>
                  <Icon name="Award" className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-secondary">{mockGrades.length}</div>
                  <p className="text-xs text-muted-foreground mt-1">В электронном дневнике</p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Занятий сегодня</CardTitle>
                  <Icon name="Clock" className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-accent">{mockSchedule.length}</div>
                  <p className="text-xs text-muted-foreground mt-1">По расписанию</p>
                </CardContent>
              </Card>
            </div>

            <Card className="animate-scale-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Stethoscope" className="text-primary" />
                  Добро пожаловать в РосУниМед
                </CardTitle>
                <CardDescription>
                  Личный кабинет студента медицинского университета
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-foreground leading-relaxed">
                  Личный кабинет предоставляет доступ к электронному дневнику, расписанию занятий 
                  и всей необходимой информации для успешного обучения. Отслеживайте свою успеваемость, 
                  планируйте время и будьте в курсе событий университета.
                </p>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="flex items-start gap-3 p-4 bg-card border rounded-xl">
                    <Icon name="CheckCircle" className="text-primary mt-0.5" size={20} />
                    <div>
                      <p className="font-medium text-sm">Онлайн дневник</p>
                      <p className="text-xs text-muted-foreground">Все оценки в одном месте</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-card border rounded-xl">
                    <Icon name="CheckCircle" className="text-secondary mt-0.5" size={20} />
                    <div>
                      <p className="font-medium text-sm">Расписание</p>
                      <p className="text-xs text-muted-foreground">Актуальное расписание занятий</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="diary" className="space-y-6 animate-fade-in">
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Icon name="BookOpen" className="text-primary" />
                      Электронный дневник
                    </CardTitle>
                    <CardDescription>Ваши оценки и успеваемость</CardDescription>
                  </div>
                  <Badge variant="outline" className="text-base px-4 py-2 w-fit">
                    Средний балл: {averageGrade}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockGrades.map((grade, index) => (
                    <div
                      key={index}
                      className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-card border rounded-xl hover:shadow-md transition-all"
                    >
                      <div className="flex-1 mb-3 sm:mb-0">
                        <h3 className="font-semibold text-foreground">{grade.subject}</h3>
                        <div className="flex gap-2 mt-1 flex-wrap">
                          <Badge variant="secondary" className="text-xs">
                            {grade.type}
                          </Badge>
                          <span className="text-sm text-muted-foreground">{grade.date}</span>
                        </div>
                      </div>
                      <Badge className={`${getGradeColor(grade.score)} text-xl font-bold px-4 py-2 border`}>
                        {grade.score}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="schedule" className="space-y-6 animate-fade-in">
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Icon name="Calendar" className="text-primary" />
                      Расписание занятий
                    </CardTitle>
                    <CardDescription>Понедельник, 21 октября 2025</CardDescription>
                  </div>
                  <Select value={selectedGroup} onValueChange={setSelectedGroup}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Выберите группу" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ЛД-21">ЛД-21</SelectItem>
                      <SelectItem value="ЛД-22">ЛД-22</SelectItem>
                      <SelectItem value="СД-21">СД-21</SelectItem>
                      <SelectItem value="ПД-21">ПД-21</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockSchedule.map((lesson, index) => (
                    <div
                      key={index}
                      className="flex gap-4 p-4 bg-card border rounded-xl hover:shadow-md transition-all"
                    >
                      <div className="flex flex-col items-center justify-center bg-primary/5 rounded-lg px-4 py-2 min-w-[100px] border">
                        <Icon name="Clock" size={20} className="text-primary mb-1" />
                        <p className="text-xs font-medium text-center">{lesson.time}</p>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground mb-1">{lesson.subject}</h3>
                        <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Icon name="User" size={14} />
                            {lesson.teacher}
                          </span>
                          <span className="flex items-center gap-1">
                            <Icon name="MapPin" size={14} />
                            Аудитория {lesson.room}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
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