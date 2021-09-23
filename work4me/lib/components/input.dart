import 'package:flutter/material.dart';
import 'package:flutter/animation.dart';

class Input extends StatefulWidget {
  final String label;

  const Input({Key? key, this.label = ''}) : super(key: key);

  @override
  _InputState createState() => _InputState();
}

class _InputState extends State<Input> with SingleTickerProviderStateMixin {
  final FocusNode _focus = FocusNode();
  Color labelColor = Colors.black26;
  late Animation<double> animation;
  late AnimationController controller;

  @override
  void initState() {
    super.initState();
    _focus.addListener(_onFocusChange);
    controller = AnimationController(
        duration: const Duration(milliseconds: 200), vsync: this);
    animation = Tween<double>(begin: 0, end: 75).animate(controller);
    animation.addListener(() {
      setState(() {});
    });
  }

  @override
  void dispose() {
    _focus.removeListener(_onFocusChange);
    _focus.dispose();
    controller.dispose();
    super.dispose();
  }

  void _onFocusChange() {
    debugPrint((_focus.hasFocus.toString()));
    if (_focus.hasFocus) {
      controller.forward();
    } else {
      controller.reverse();
    }
  }

  @override
  Widget build(BuildContext context) {
    if (animation.isCompleted) {
      setState(() {
        labelColor = Colors.blue;
      });
    }
    if (animation.isDismissed) {
      setState(() {
        labelColor = Colors.black26;
      });
    }
    return GestureDetector(
      onTap: () => {_focus.unfocus()},
      child: SizedBox(
        width: MediaQuery.of(context).size.width * 0.7,
        height: MediaQuery.of(context).size.height,
        child: Stack(alignment: Alignment.centerLeft, children: [
          Container(
            margin: EdgeInsets.only(bottom: animation.value),
            child: Text(widget.label,
                style: TextStyle(fontSize: 32, color: labelColor)),
          ),
          TextField(
            focusNode: _focus,
            autofocus: false,
            keyboardType: TextInputType.emailAddress,
            style: const TextStyle(fontSize: 24),
            textAlignVertical: TextAlignVertical.bottom,
          )
        ]),
      ),
    );
  }
}
